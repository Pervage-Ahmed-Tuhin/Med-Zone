import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import wave2 from '../../assets/img/Polygon Luminary 2.svg';
import unlock2 from '../../assets/img/undraw_investor_update_re_qnuu (1).svg';
import { FaUser } from "react-icons/fa6";
import { MdAddAPhoto } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

import Spinner from "../Spinner/Spinner";

const UpdateUser = () => {
    const [loading, setLoading] = useState(true);

  
    const { UpdateUserProfile, infoHolder, setInfoHolder, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Med-Zone | UpdateProfile";
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


 
    const onSubmit = async (data) => {
        const { name, photoURL, request } = data;
        console.log(request);
        try {

            await UpdateUserProfile(name, photoURL);
            setInfoHolder({ ...infoHolder, name, photoURL });
            toast.success("Update successful");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            console.log(error);
            toast.error("Update failed");
        }
    };

    if (loading) {
        return <Spinner></Spinner>;
    }

    return (
        <div>
            
            <img src={wave2} className="fixed hidden lg:block h-full" style={{ zIndex: -1 }} alt="Background" />
            <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
                <img src={unlock2} className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto" alt="Illustration" />

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center w-1/2">
                    <img src={infoHolder.photoURL} className="w-32 rounded-lg" alt="User" />
                    <h2 className="my-8 font-play-fare font-bold text-3xl text-[#f5bd5a] md:text-white text-center">
                        Update your profile <br /> <span className='text-[#f5bd5a] md:text-red-900'>Here</span>
                    </h2>


                    <div className="relative flex items-center">
                        <FaUser className='text-xl font-bold text-black' />
                        <input
                            type="text"
                            placeholder="Name" defaultValue={user?.displayName}
                            {...register("name", { required: true })}
                            className="pl-8 border-b-2 font-play-fare focus:outline-none focus:border-[#00BFA6] transition-all duration-500 text-lg"
                        />
                        {errors.name && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="relative mt-8 flex items-center ">
                        <MdAddAPhoto className='text-xl font-bold text-black' />
                        <input
                            type="text"
                            placeholder="Photo URL" defaultValue={user?.photoURL}
                            {...register("photoURL", { required: true })}
                            className="pl-8 border-b-2 font-play-fare focus:outline-none focus:border-[#00BFA6] transition-all duration-500 text-lg"
                        />
                        {errors.photoURL && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="flex justify-center mt-4 mb-4 gap-4">

                    </div>
                    <div className="mt-4 text-2xl text-red-900 md:text-white font-bold">
                        Home? <Link to='/' className='text-red-900 underline'>Go Back</Link>
                    </div>
                    <button
                        type="submit"
                        className="py-3 px-20 bg-red-900 rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
                    >
                        Update
                    </button>
                </form>

                <ToastContainer />
            </div>
        </div>
    );
};

export default UpdateUser;
