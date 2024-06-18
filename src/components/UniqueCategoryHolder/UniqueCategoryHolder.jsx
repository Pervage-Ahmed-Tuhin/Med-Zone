import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { useParams } from "react-router-dom";



const UniqueCategoryHolder = () => {
  
    const {category} = useParams();
    console.log(category);
    const {
        data: SoloCategoryData = [],
        isLoading,
        error,
      } = useQuery({
        queryKey: ["unique"],
        queryFn: async () => {
          try {
            const { data } = await axios.get(`http://localhost:5000/UniqueCategory/${category}`);
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
      console.log(SoloCategoryData);

    return (
        <div>
     
     
       

      {/* start */}

      <div className="overflow-x-auto">
        <table className="table text-xl">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Vendor</th>
              <th>Select</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {SoloCategoryData.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={product.image_url}
                          alt={product.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>{product.vendor}</td>
                <td>
                  <button className="btn">Select</button>
                </td>
                <th>
                  <button className="btn text-xl">
                    <FaEye />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default UniqueCategoryHolder;