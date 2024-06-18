import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const DiscountBanner = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:5000/discounted')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching discounted products:', error));
    }, []);

    return (
        <div className="text-center mt-7 mb-10">
            <h1 className="text-3xl font-bold mb-5">Discounted Products</h1>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {data.map(product => (
                    <SwiperSlide  onClick={() => {
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
