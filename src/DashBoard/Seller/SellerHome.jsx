import { useQuery } from "@tanstack/react-query";
import useAuth from "../../components/Hooks/useAuth";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure ";
import Spinner from "../../components/Spinner/Spinner";
import RevenueChart from "./RevenueChart ";
import useRole from "../../components/Hooks/useRole";


const SellerHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [role] = useRole();

    const { data: revenueData, isLoading } = useQuery({
        queryKey: ["seller-revenue", user?.email],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/seller/revenue/${user?.email}`);
                return data;
            } catch (error) {
                console.error("Error fetching revenue data:", error);
                throw error;
            }
        },
        enabled: !!user?.email, // Only run the query if the user email is available
    });

    if (isLoading) {
        return <Spinner></Spinner>;
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Seller Home Page</h1>
            <div className="card w-96 bg-base-100 shadow-xl mt-9 mb-9 m-auto z-0">
                <figure><img className="rounded-lg" src={user?.photoURL} alt="User" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Welcome {user?.displayName}</h2>
                    <p className="text-xl font-semibold">Below you can see the total information of your products</p>
                    <p className="text-xl font-semibold">Your Total Earning : {revenueData?.totalRevenue}$</p>
                    <p className="text-base font-semibold">Your role: {role}</p>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-around">
                <div className="w-full lg:w-1/2 h-64">
                    <RevenueChart
                        totalRevenue={revenueData?.totalRevenue || 0}
                        pendingTotal={revenueData?.pendingTotal || 0}
                    />
                </div>
            </div>
        </div>
    );
};

export default SellerHome;