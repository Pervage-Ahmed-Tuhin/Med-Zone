import { useQuery, useMutation } from "@tanstack/react-query";

import Spinner from "../../components/Spinner/Spinner";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure ";
import Swal from "sweetalert2";
import useAuth from "../../components/Hooks/useAuth";
import { Helmet } from "react-helmet";



const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user: RealUser } = useAuth();
    const { data: userData = [], isLoading, refetch } = useQuery({
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

    const mutation = useMutation({
        mutationFn: ({ email, role }) => {
            return Swal.fire({
                title: "Are you sure?",
                text: "Think twice!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, change it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const { data } = await axiosSecure.patch(`/users/${email}`, { role });
                        return data;
                    } catch (error) {
                        console.error("Error updating user role:", error);
                        throw error;
                    }
                } else {
                    throw new Error("User cancelled the action");
                }
            });
        },
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "user role updated",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        },
        onError: (error) => {
            console.error("Mutation failed:", error);
        }
    });

    const handleChange = (e, email) => {
        const role = e.target.value;
        console.log(email, role);
        mutation.mutate({ email, role });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div>
            <Helmet>
                <title>Multi-Vendor || ManageUsers</title>
            </Helmet>
            <h1 className="text-center text-xl font-bold mt-5 mb-6">Manage Users</h1>
            <div className="flex justify-center">
                <div className="overflow-x-auto">
                    <table className="table text-2xl">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map(user => (
                                <tr key={user._id}>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <select
                                            name="role"
                                            onChange={(e) => handleChange(e, user.email)}
                                            defaultValue={user.role}
                                            disabled={user?.email === RealUser?.email}
                                        >
                                            <option value="user">User</option>
                                            <option value="seller">Seller</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
