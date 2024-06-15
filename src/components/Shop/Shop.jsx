import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import "./shop.css";
import { FaEye } from "react-icons/fa";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { count } = useLoaderData();

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/allMedicines?page=${currentPage}&size=${itemsPerPage}`
      )
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [currentPage, itemsPerPage]);

  const handleItemsOnChange = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="mt-20 mb-9">
        <p className="text-xl text-center">Current Page : {currentPage}</p>
        <div className="flex justify-center mt-6 pagination">
          <button onClick={handlePrevPage} className="btn mr-4">
            Prev
          </button>
          {pages.map((page) => (
            <button
              onClick={() => setCurrentPage(page)}
              className={`btn mr-6 ${currentPage === page ? "selected" : ""}`}
              key={page}
            >
              {page}
            </button>
          ))}
          <button onClick={handleNextPage} className="btn mr-4">
            Next
          </button>
          <select
            onChange={handleItemsOnChange}
            value={itemsPerPage}
            name=""
            id=""
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
     

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
            {products.map((product) => (
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

export default Shop;
