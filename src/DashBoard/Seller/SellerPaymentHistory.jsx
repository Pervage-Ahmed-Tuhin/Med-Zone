import { useQuery } from "@tanstack/react-query";
import useAuth from "../../components/Hooks/useAuth";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure ";
import Spinner from "../../components/Spinner/Spinner";


const SellerPaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: purchaseHistory, isLoading } = useQuery({
        queryKey: ["seller-purchase-history", user?.email],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/seller/purchase-history/${user?.email}`);
                return data;
            } catch (error) {
                console.error("Error fetching purchase history:", error);
                throw error;
            }
        },
        enabled: !!user?.email, // Only run the query if the user email is available
    });

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Purchase History</h1>
            <table className="table-auto w-full text-xl">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Amount</th>
                        <th>Payment Status</th>
                        <th>Purchase Date</th>
                    </tr>
                </thead>
                <tbody>
                    {purchaseHistory.map(transaction => (
                        transaction.cartData
                            .filter(item => item.sellerEmail === user?.email)
                            .map(item => (
                                <tr key={item._id}>
                                    <td>{transaction.userName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>${transaction.totalAmount.toFixed(2)}</td>
                                    <td>{transaction.paymentStatus}</td>
                                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                </tr>
                            ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SellerPaymentHistory;
