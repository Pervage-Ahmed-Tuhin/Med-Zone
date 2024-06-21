import img2 from "../../assets/img/email.png";
import img3 from "../../assets/img/location.png";
import img4 from "../../assets/img/phone.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";


import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";





const ContactUs = () => {
    const formRef = useRef(null);
    const containerRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Thank for contacting us");
        formRef.current.reset();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div ref={containerRef} className="max-w-[1170px] mx-auto py-8">

            <h1 className="text-3xl font-play-fare font-bold text-center mt-9">

                Contact Us

            </h1>
            <div className="divider"></div>
            <p className="text-xl font-play-fare text-gray-400 text-center mt-4 mb-5"> Here You can share your query with us <br /> Free to Share our website with your family</p>

            <div

                className="flex justify-center items-center min-h-screen"
            >
                <div className="bg-white max-w-5xl w-full rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                    <div className="bg-[#009688] p-8 md:p-12">
                        <h3 className="text-white text-3xl font-semibold mb-6">Contact us</h3>
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-white text-lg mb-2" htmlFor="name">Name:</label>
                                <input type="text" name="name" id="name" className="w-full p-3 rounded-lg border-2 border-[#fafafa] bg-transparent text-white focus:outline-none focus:border-[#fe7a36] transition" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white text-lg mb-2" htmlFor="email">Email:</label>
                                <input type="email" name="email" id="email" className="w-full p-3 rounded-lg border-2 border-[#fafafa] bg-transparent text-white focus:outline-none focus:border-[#fe7a36] transition" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white text-lg mb-2" htmlFor="phone">Phone:</label>
                                <input type="tel" name="phone" id="phone" className="w-full p-3 rounded-lg border-2 border-[#fafafa] bg-transparent text-white focus:outline-none focus:border-[#fe7a36] transition" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white text-lg mb-2" htmlFor="message">Write Your Message here:</label>
                                <textarea name="message" id="message" className="w-full p-3 rounded-lg border-2 border-[#fafafa] bg-transparent text-white focus:outline-none focus:border-[#fe7a36] transition h-40 resize-none" required></textarea>
                            </div>
                            <button type="submit" className="w-full bg-white text-[#009688] py-3 rounded-lg font-semibold text-lg transition hover:bg-[#fe7a36] hover:text-white">Submit</button>
                        </form>
                    </div>
                    <div className="p-8 md:p-12">
                        <h3 className="text-[#fe7a36] text-3xl font-semibold mb-6">Let's get in touch</h3>
                        <div className="text-gray-600 mb-6">
                            This is the contact page. Please write your questions here and then send us a message. We will try to answer within a few hours. Thank you for contacting us!
                            <br />
                            <span className="text-[#fe7a36]">Med</span>-Zone
                        </div>
                        <div className="space-y-4 mb-6">
                            <div className="flex items-center text-gray-600">
                                <img src={img2} alt="Location" className="w-7 h-7 mr-3" />
                                <span>Dhaka-Bangladesh</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <img src={img3} alt="Email" className="w-7 h-7 mr-3" />
                                <span>Clashroyaltuhin13@gmail.com</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <img src={img4} alt="Phone" className="w-7 h-7 mr-3" />
                                <span>+8801641281589</span>
                            </div>
                        </div>
                        <div>
                            <span className="block text-gray-600 mb-4">Contact Us:</span>
                            <div className="flex space-x-3">
                                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-md bg-gradient-to-r from-[#fe7a36] to-[#fe7a36] text-white transition-transform transform hover:scale-105">
                                    <FaFacebookF />
                                </a>
                                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-md bg-gradient-to-r from-[#fe7a36] to-[#fe7a36] text-white transition-transform transform hover:scale-105">
                                    <FaTwitter />
                                </a>
                                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-md bg-gradient-to-r from-[#fe7a36] to-[#fe7a36] text-white transition-transform transform hover:scale-105">
                                    <FaInstagram />
                                </a>
                                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-md bg-gradient-to-r from-[#fe7a36] to-[#fe7a36] text-white transition-transform transform hover:scale-105">
                                    <FaLinkedin />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default ContactUs;
