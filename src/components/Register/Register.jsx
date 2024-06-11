import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import wave2 from '../../assets/img/Polygon Luminary (1).svg';
import unlock2 from '../../assets/img/register.svg';

import avatar1 from '../../assets/img/register-avatar.svg';

import { useContext, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosEye } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";
import useAuth from "../Hooks/useAuth";
import axios from "axios";

const Register = () => {
    const [Type, setType] = useState(false);
    useEffect(() => {
        document.title = "Med-Zone|Register";
    }, [])
    const [errorState, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, setInfoHolder, UpdateUserProfile } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const delay = setTimeout(() => {
            setLoading(false);
        }, 1000)
        return () => clearTimeout(delay);
    }, [])



    const onSubmit = async (data) => {
        setLoading(true);
        const { email, password, name, photo } = data;
        console.log(photo);

        const formData = new FormData();
        formData.append('image', photo[0]); // Assuming `photo` is a FileList, get the first file

        try {
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );
            const photoURL = response.data.data.display_url;
            console.log(photoURL);

            // Password validation
            const passwordCapital = /^(?=.*[A-Z]).+$/;
            const passwordSmall = /^(?=.*[a-z]).+$/;

            if (password.length < 6) {
                toast("The password must be 6 characters or more");
                setLoading(false);
                return;
            }

            if (!passwordCapital.test(password)) {
                toast("You need at least one capital letter");
                setLoading(false);
                return;
            }

            if (!passwordSmall.test(password)) {
                toast("You need at least one small letter");
                setLoading(false);
                return;
            }

            // Create user and update profile
            await createUser(email, password);
            toast.success(`Welcome! To Med-Zone`, { autoClose: 4000 });

            await UpdateUserProfile(name, photoURL);
            setInfoHolder(data);
            setLoading(false);
            navigate('/');

        } catch (error) {
            setError(error);
            console.log(error);
            toast.error(`Error: ${error.code?.split('/')[1]}`, { type: 'error' });
            setLoading(false);
            navigate('/register');
        }

      
    };
    return (
        <div>
            <img src={wave2} className="fixed hidden lg:block h-full" style={{ zIndex: -1 }} />
            <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
                <img src={unlock2} className="hidden lg:block w-[60%] hover:scale-150 transition-all duration-500 transform mx-auto" />
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center w-1/2">
                    <img src={avatar1} className="w-32" />
                    <h2 className="my-8 font-play-fare font-bold text-xl md:text-3xl text-[#f5bd5a] md:text-white text-center">
                        Join the family of <br /> <span className='text-[#f5bd5a] md:text-red-900'>Med-Zone</span>
                    </h2>
                    <div className="relative flex items-center">
                        <input type="text" placeholder="Name" name="name"
                            className="pl-8 border-b-2 font-play-fare focus:outline-none focus:border-[#00BFA6] transition-all duration-500 capitalize text-lg"
                            {...register("name", { required: true })} />
                        {errors.name && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="relative mt-8 flex items-center ">
                        <input type="email" placeholder="Email" name="email"
                            className="pl-8 border-b-2 font-play-fare focus:outline-none focus:border-[#00BFA6] transition-all duration-500 text-lg"
                            {...register("email", { required: true })} />
                        {errors.email && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="relative mt-8 flex items-center ml-5 ">
                        <input type={Type ? "text" : "password"} placeholder="Password" name="password"
                            className="pl-8 border-b-2 font-play-fare focus:outline-none focus:border-[#00BFA6] transition-all duration-500  text-lg"
                            {...register("password", { required: true })} />
                        {errors.password && <span className="text-red-500">This field is required</span>}
                        <span onClick={() => setType(!Type)}>

                            {
                                Type ? <IoIosEye className="text-2xl relative left-[88%] md:left-[92%] bottom-1" /> : <FaRegEyeSlash className="text-lg md:text-2xl relative left-[88%] md:left-[88%] bottom-1" />
                            }

                        </span>
                    </div>
                    <input name="photo" type="file" className="file-input file-input-bordered file-input-warning w-full max-w-xs mt-9 border-none outline-none" {...register("photo")} />
                    <a href="#" className=" text-red-900 md:text-white mt-8 text-2xl font-bold">Have an account? <br /> <Link to='/login' className="text-red-900 underline">Log In</Link></a>
                    <button type="submit" className="py-3 px-20 bg-red-900 rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500">Register</button>
                </form>

            </div>

            <ToastContainer />

        </div>
    );
};

export default Register;