import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Banner = ({ data }) => {
    return (
        <div className="max-w-6xl mx-auto border rounded-lg ">
            <Carousel className="p-3">
                {data.map((medicine, index) => (
                    <div key={index}>

                        <h1 className="text-5xl text-black font-semibold mt-10">{medicine.name}</h1>
                        <h1 className="text-2xl text-black font-medium mt-3">{medicine.description}</h1>

                        <img className="mt-5 rounded-lg"
                            style={{ maxWidth: '40%', height: 'auto' }}
                            src={medicine.image_url}
                            alt={medicine.name}
                        />



                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;