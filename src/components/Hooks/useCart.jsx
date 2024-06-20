import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure ";
import useAuth from "./useAuth";


const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const {
        data: cartData = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["cart", user?.email],
        enabled: !!user && !!user?.email,
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/cartInformation/${user?.email}`);
                return data;
            } catch (error) {
                console.error("Error fetching category data:", error);
                throw error; // Rethrow the error to be handled by useQuery
            }
        },
    });
    return [cartData, refetch, isLoading, error];
};

export default useCart;