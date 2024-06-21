import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://multi-vendor-server-eight.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;