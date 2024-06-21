import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import { useLoaderData } from "react-router-dom";
import HomeCategory from "../CategoryBox/HomeCategory";
import DiscountBanner from "../DiscoutBanner/DiscountBanner";
import useRole from "../Hooks/useRole";
import HappyClients from "../HappyClients/HappyClients";
import ContactUs from "../ContactUs/ContactUs";


const Home = () => {
    const data = useLoaderData();
    console.log(data);
    const [role, isLoading] = useRole();
    console.log(role)
    return (
        <div className="max-w-6xl mx-auto mt-32">
            <Helmet>
                <title>Multi-Vendor||Home</title>
            </Helmet>

            <Banner data={data}></Banner>

            <HomeCategory></HomeCategory>

            <DiscountBanner></DiscountBanner>

            <HappyClients></HappyClients>
            <ContactUs></ContactUs>

        </div>
    );
};

export default Home;