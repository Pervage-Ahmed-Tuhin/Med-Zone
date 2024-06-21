
import { useQuery } from "@tanstack/react-query";



import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useAxiosSecure from "../../components/Hooks/useAxiosSecure ";
import useAuth from "../../components/Hooks/useAuth";
import useRole from "../../components/Hooks/useRole";
import { Helmet } from "react-helmet";

const AdminHomePage = () => {
    const [role] = useRole();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: PaymentData = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["homeData", user?.email],
        enabled: !!user && !!user?.email,
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/getAllBooking`);
                return data;
            } catch (error) {
                console.error("Error fetching booking data:", error);
                throw error;
            }
        },
    });
    const { data: userData = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/users`);
                return data;
            } catch (error) {
                console.error("Error fetching user data:", error);
                throw error;
            }
        },
    });

    // Calculate totals
    const totalPaidAmount = PaymentData
        .filter(booking => booking.paymentStatus === "paid")
        .reduce((total, booking) => total + booking.totalAmount, 0);

    const totalPendingAmount = PaymentData
        .filter(booking => booking.paymentStatus === "pending")
        .reduce((total, booking) => total + booking.totalAmount, 0);

    const totalSales = totalPaidAmount + totalPendingAmount;

    // Prepare data for the chart
    const chartData = [
        { name: "Total Sales", amount: totalSales },
        { name: "Total Paid", amount: totalPaidAmount },
        { name: "Total Pending", amount: totalPendingAmount },
    ];

    const userChartData = [
        { name: "Total Users", amount: userData.length },
    ];
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return (
        <div>
            <Helmet>
                <title>Multi-Vendor||adminHome</title>
            </Helmet>
            <div className="card w-96 bg-base-100 shadow-xl mt-9 mb-9 m-auto z-0">
                <figure><img className="rounded-lg" src={user?.photoURL} alt="User" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Welcome {user?.displayName}</h2>
                    <p className="text-xl font-semibold">Below you can see the total information of the website</p>
                    <p className="text-base font-semibold">Your role: {role}</p>
                </div>
            </div>
            <h1 className="text-xl font-semibold text-center mb-7 mt-7">Here is the Graphical representation of the total information of the website revenue</h1>
            <div className="chart-container m-auto md:w-2/3 w-auto">
                <BarChart width={600} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
            </div>
            <h1 className="text-xl font-semibold text-center mb-7 mt-7">Here is the Graphical representation of the total users</h1>
            <div className="chart-container m-auto md:w-2/3 w-auto">
                <BarChart width={600} height={300} data={userChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#82ca9d" />
                </BarChart>
            </div>
        </div>
    );
};

export default AdminHomePage;
