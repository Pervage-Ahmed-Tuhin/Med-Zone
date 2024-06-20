import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Spinner from "../../components/Spinner/Spinner";
import Swal from "sweetalert2";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure ";
import useAuth from "../../components/Hooks/useAuth";

const PaymentManage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const {
        data: PaymentData = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["payment", user?.email],
        enabled: !!user && !!user?.email,
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/getAllBooking`);
                return data;
            } catch (error) {
                console.error("Error fetching category data:", error);
                throw error;
            }
        },
    });

    const mutation = useMutation({
        mutationFn: async (id) => {
            try {
                const response = await axiosSecure.patch(`/updatePaymentStatus/${id}`, {
                    paymentStatus: "paid"
                });
                return response.data;
            } catch (error) {
                console.error("Error updating payment status:", error);
                throw error;
            }
        },
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payment status updated",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
            queryClient.invalidateQueries(["payment", user?.email]);
        },
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: "Please try again later"
            });
        }
    });

    const updateStatus = (id) => {
        mutation.mutate(id);
    }

    if (isLoading) return <Spinner></Spinner>;
    if (error) return <div>Error loading data</div>;

    return (
        <div>
            <table className="table text-xl w-full">
                <thead>
                    <tr>
                        <th>Buyer Name</th>
                        <th>Buyer Email</th>
                        <th>Total Price</th>
                        <th>Transaction ID</th>
                        <th>Status</th>
                        <th>Date</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {PaymentData.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking.userName}</td>
                            <td>{booking.email}</td>
                            <td>${booking.totalAmount.toFixed(2)}</td>
                            <td>{booking.transactionId}</td>
                            <td>{booking.paymentStatus}</td>
                            <td>{new Date(booking.date).toLocaleDateString()}</td>
                            <td>
                                {booking.paymentStatus === "pending" && (
                                    <button onClick={() => updateStatus(booking._id)} className="btn">Accept Payment</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentManage;
