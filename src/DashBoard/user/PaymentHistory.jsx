import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure ";
import useAuth from "../../components/Hooks/useAuth";


const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {
        data: paymentHistoryData = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["singleUserInfo", user?.email],
        enabled: !!user && !!user?.email,
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/getSingleBookingInfo/${user?.email}`);
                return data;
            } catch (error) {
                console.error("Error fetching category data:", error);
                throw error;
            }
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Payment History : {user?.displayName}</h1>
            <table className="min-w-full bg-white border border-gray-200 overflow-x-auto">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">User Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Transaction ID</th>
                        <th className="py-2 px-4 border-b">Total Amount</th>
                        <th className="py-2 px-4 border-b">Total Items</th>
                        <th className="py-2 px-4 border-b">Payment Status</th>
                        <th className="py-2 px-4 border-b">Purchase Date</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentHistoryData.map((payment) => (
                        <tr key={payment._id}>
                            <td className="py-2 px-4 border-b text-center">{payment.userName}</td>
                            <td className="py-2 px-4 border-b text-center">{payment.email}</td>
                            <td className="py-2 px-4 border-b text-center">{payment.transactionId}</td>
                            <td className="py-2 px-4 border-b text-center">${payment.totalAmount.toFixed(2)}</td>
                            <td className="py-2 px-4 border-b text-center">{payment.cartData.length}</td>
                            <td className="py-2 px-4 border-b text-center">{payment.paymentStatus}</td>
                            <td className="py-2 px-4 border-b text-center">{new Date(payment.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
