import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import { useLoaderData } from "react-router-dom";
import HomeCategory from "../CategoryBox/HomeCategory";


const Home = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div className="max-w-6xl mx-auto mt-32">
            <Helmet>
                <title>Multi-Vendor||Home</title>
            </Helmet>

            <Banner data={data}></Banner>

            <HomeCategory></HomeCategory>

        </div>
    );
};

export default Home;