import { Link } from "react-router-dom";

import pic from '../../assets/img/undraw_server_down_s-4-lk.svg';

const ErrorPage = () => {
    return (
        <div>
            <section className="flex items-center h-full p-16  dark:text-gray-800" >
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">
                        <img src={pic} alt="" />
                        <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
                            <span className="sr-only">Error</span><span className="text-[#f5bd5a]">404</span>
                        </h2>
                        <p className="text-2xl font-semibold md:text-3xl">Sorry, we could not find this page.</p>
                        <p className="mt-4 mb-8 dark:text-gray-500">But do not worry, you can find plenty of other things on our homepage.</p>

                        <Link to='/'>
                            <button className="btn text-white bg-[#f5bd5a] px-8 py-3 poppins font-semibold">Back to homePage</button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ErrorPage;