import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const DiscountBanner = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://multi-vendor-server-eight.vercel.app/discounted')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching discounted products:', error));
    }, []);

    console.log(data);
    return (
        <div className="text-center mt-7 mb-10">

            <h1 className="text-3xl font-play-fare font-bold text-center mt-9 text-[#fe7a36]">

                Discounted Products

            </h1>
            <div className="divider"></div>
            <p className="text-xl font-play-fare text-gray-400 text-center mt-4 mb-9"> Here are the discounted products <br /> Free to Share our website with your family</p>

            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {data.map(product => (
                    <SwiperSlide onClick={() => {
                        navigate(`/UniqueCategory/${product.category}`);
                    }} key={product._id} className="relative">
                        <div
                            className="h-64 bg-cover bg-center rounded-lg overflow-hidden"
                            style={{ backgroundImage: `url(${product.image_url})` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
                                <div className="text-white text-center">
                                    <p className="font-bold text-lg">Name :{product.name}</p>
                                    <p className="text-sm">Category :{product.category}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default DiscountBanner;
