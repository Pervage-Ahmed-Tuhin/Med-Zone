import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import { FaGithub, FaGoogle, FaLock, FaUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wave2 from '../../assets/img/Polygon Luminary 2.svg';
import unlock2 from '../../assets/img/login-2.svg';
import avatar1 from '../../assets/img/register-avatar.svg';
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const from = location?.state || "/";
    const navigate = useNavigate();
    const { loginUser, GoogleLogin, GitHUbLogin, setInfoHolder, saveUser } = useAuth();

    useEffect(() => {
        const delay = setTimeout(() => {
            setLoading(false);
        }, 1000)
        return () => clearTimeout(delay);
    }, [])

    const onSubmit = (data) => {
        const { email, password } = data;
        // console.log(email, password);
        loginUser(email, password)
            .then(result => {
                // console.log(result);
                toast(`Welcome! ${result.user.displayName}`);
                setTimeout(() => {
                    setLoading(false);
                    navigate(from);
                }, 1000)

            })
            .catch(error => {
                // console.log(error);
                toast.error("Wrong Password!");
                setLoading(false);
            })
    }


    const handleGoogleLogin = () => {
        GoogleLogin()
            .then(result => {
                // console.log(result.user);
                // setInfoHolder(result.user);
                const MainUser = result.user;
                const email = MainUser.email;
                console.log(email);
                console.log(result.user.email);
                setInfoHolder({ name: result.user.displayName, email: result.user.email, photoURL: result.user.photoURL });
                toast(`Welcome! ${result.user.displayName}`);
                saveUser(MainUser);
                setTimeout(() => {
                    navigate(from);
                }, 1000)
                // navigate(from)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleGithubLogin = () => {
        GitHUbLogin()
            .then(result => {

                // console.log(result.user);
                // setInfoHolder(result.user);
                const MainUser = result.user;
                const email = MainUser.email;
                console.log(email);
                setInfoHolder({ name: result.user.displayName, email: result.user.email, photoURL: result.user.photoURL });
                toast(`Welcome! ${result.user.displayName}`);
                saveUser(MainUser);
                setTimeout(() => {
                    navigate(from);
                }, 1000)
                // navigate(from);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        document.title = "DinerZZ|Login";
    }, [])
    return (
        <div>
            <img src={wave2} className="fixed hidden lg:block h-full w-full" style={{ zIndex: -1 }} />
            <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
                <img src={unlock2} className="hidden lg:block w-[35%] hover:scale-150 transition-all duration-500 transform mx-auto" />
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center w-1/2">
                    <img src={avatar1} className="w-32" />
                    <h2 className="my-8 font-play-fare font-bold text-3xl text-[#f5bd5a] md:text-white text-center">
                        Welcome to <br /> <span className='text-[#f5bd5a] md:text-red-900'>Med-Zone</span>
                    </h2>
                    <div className="relative flex items-center">
                        <FaUser />
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: true })}
                            className="pl-8 border-b-2 font-play-fare focus:outline-none focus:border-[#00BFA6]transition-all duration-500 text-lg"
                        />
                        {errors.email && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="relative mt-8 flex items-center ">
                        <FaLock />
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: true })}
                            className="pl-8 border-b-2 font-play-fare focus:outline-none focus:border-[#00BFA6] transition-all duration-500  text-lg"
                        />
                        {errors.password && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="flex justify-center mt-4 mb-4 gap-4">
                        <button onClick={handleGoogleLogin} className="bg-red-900 text-white  text-2xl px-4 rounded-lg btn"><FaGoogle /></button>
                        <button onClick={handleGithubLogin} className="bg-red-900 text-white text-2xl px-4 rounded-lg btn"><FaGithub /></button>
                    </div>
                    <a href="#" className="mt-4 text-red-900 md:text-white font-bold text-2xl">
                        New here? <Link to='/register' className="underline text-red-900">Register</Link>
                    </a>
                    <button
                        type="submit"
                        className="py-3 px-20 bg-red-900 rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
                    >
                        Login
                    </button>
                </form>
                <ToastContainer></ToastContainer>
            </div>
        </div>
    );
};

export default Login;