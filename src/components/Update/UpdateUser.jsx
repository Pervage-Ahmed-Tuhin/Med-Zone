import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import wave2 from '../../assets/img/Polygon Luminary 2.svg';
import unlock2 from '../../assets/img/undraw_investor_update_re_qnuu (1).svg';
import { FaUser } from "react-icons/fa6";
import { MdAddAPhoto } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

const UpdateUser = () => {
    const [loading, setLoading] = useState(true);
    const { UpdateUserProfile, infoHolder, setInfoHolder, user } = useAuth();
    // console.log(infoHolder);
    // const { email, name, photoURL, password } = infoHolder;
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Med-Zone|UpdateProfile";
        setTimeout(() => {
            setLoading(false);
        }, 2000)

    }, [])



    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const onSubmit = (data) => {
        const { name, photoURL } = data;
        UpdateUserProfile(name, photoURL)
            .then(() => {
                setInfoHolder({ ...infoHolder, name, photoURL });
                toast.success("Update successful");
                setTimeout(() => {
                    navigate("/");
                }, 1000); // Delay the navigation to show the toast
            })
            .catch(error => {
                console.log(error);
                toast.error("Update failed");
            });
    }

    return (
        <div>
            <img src={wave2} className="fixed hidden lg:block h-full" style={{ zIndex: -1 }} />
            <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
                <img src={unlock2} className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto" />
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center w-1/2">
                    <img src={infoHolder.photoURL} className="w-32 rounded-lg" />
                    <h2 className="my-8 font-play-fare font-bold text-3xl text-[#f5bd5a] md:text-white text-center">
                        update your profile <br /> <span className='text-[#f5bd5a] md:text-red-900'>Here</span>
                    </h2>
                    <div className="relative flex items-center">
                        <FaUser className='text-xl font-bold text-black' />
                        <input
                            type="text"
                            placeholder="Name" defaultValue={user?.displayName}
                            {...register("name", { required: true })}
                            className="pl-8 border-b-2 font-play-fare focus:outline-none focus:border-[#00BFA6]transition-all duration-500  text-lg"
                        />
                        {errors.name && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="relative mt-8 flex items-center ">
                        <MdAddAPhoto className='text-xl font-bold text-black' />
                        <input
                            type="text"
                            placeholder="photoURL" defaultValue={user?.photoURL}
                            {...register("photoURL", { required: true })}
                            className="pl-8 border-b-2 font-play-fare focus:outline-none focus:border-[#00BFA6] transition-all duration-500  text-lg"
                        />
                        {errors.photoURL && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="flex justify-center mt-4 mb-4 gap-4">

                    </div>
                    <a href="#" className="mt-4 text-2xl text-red-900 md:text-white font-bold">
                        Home ? <Link to='/' className='text-red-900 underline'>Go Back</Link>
                    </a>
                    <button
                        type="submit"
                        className="py-3 px-20 bg-red-900 rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
                    >
                        Update
                    </button>
                </form>
                <ToastContainer></ToastContainer>
            </div>

        </div>
    );
};

export default UpdateUser;