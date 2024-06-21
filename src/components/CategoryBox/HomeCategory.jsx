import service from "./../../../public/Career Counseling-01.jpg";
import { GiPill } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const HomeCategory = () => {
  const navigate = useNavigate();

  const {
    data: category = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/category");
        return data;
      } catch (error) {
        console.error("Error fetching category data:", error);
        throw error; // Rethrow the error to be handled by useQuery
      }
    },
  });

  if (isLoading) {
    console.log("Loading...");
  }

  if (error) {
    console.error("Error:", error);
  }

  console.log(category);
  return (
    <div>
      <div className="my-20">

        <h1 className="text-3xl font-play-fare font-bold text-center mt-9 text-[#fe7a36]">

          Medicine Category

        </h1>
        <div className="divider"></div>
        <p className="text-xl font-play-fare text-gray-400 text-center mt-4 mb-5"> Here are all the category of medicines available in this website<br /> Free to Share our website with your family</p>


        <div className="flex flex-row gap-5 flex-wrap lg:max-w-7xl mx-16 md:mx-auto justify-center">
          {category.map((soloCategory) => (
            <div
              key={soloCategory.category} // Ensure unique key for each element
              onClick={() => {
                navigate(`/UniqueCategory/${soloCategory.category}`);
              }}
              className="flip-card"
              tabIndex="0"
            >
              <div className="flip-card-inner">
                <div className="flip-card-front flex flex-col">
                  <img
                    className="darkened-image h-[300px] sm:h-auto"
                    src={soloCategory.image_url}
                    alt=""
                  />
                  <h1 className="fixed text-[#fe7a36] font-bold text-xl md:text-2xl">
                    {soloCategory.category}
                  </h1>
                  <button className="btn btn-outline text-[#fe7a36] lg:hidden fixed bottom-6">
                    Read More
                  </button>
                </div>
                <div className="flip-card-back">
                  <div className="w-[300px] h-[300px] bg-base-100 shadow-xl zoom text-black">
                    <div className="flex flex-col gap-3 px-3 pt-5">
                      <h2 className="text-3xl sm:text-5xl text-red-700 flex justify-center">
                        <GiPill />
                      </h2>
                      <p className="font-bold text-blue-950">
                        {soloCategory.category}
                      </p>
                      <button className="btn btn-outline btn-error">
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCategory;
