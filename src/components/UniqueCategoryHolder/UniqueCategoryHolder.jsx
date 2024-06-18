import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { useState, useRef, useEffect } from "react";

const UniqueCategoryHolder = () => {
  const { category } = useParams();
  console.log(category);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const modalRef = useRef(null);

  const {
    data: SoloCategoryData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["unique", category],
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

  useEffect(() => {
    if (selectedProduct && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [selectedProduct]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleViewClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  console.log(SoloCategoryData);

  return (
    <div>
      {/* Start */}
      <div className="overflow-x-auto">
        <table className="table text-xl">
          {/* Head */}
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
                <td>
                  <button className="btn text-xl" onClick={() => handleViewClick(product)}>
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <dialog id="my_modal_2" className="modal" ref={modalRef}>
          <div className="modal-box">
            <div className="card card-compact bg-base-100 shadow-xl">
              <figure><img src={selectedProduct.image_url} alt="Product" /></figure>
              <div className="card-body">
                <h2 className="card-title">Name : {selectedProduct.name}</h2>
                <h2 className="card-title">Category : {selectedProduct.category}</h2>
                <p>Description : {selectedProduct.description}</p>
                <p>Price : <span>${selectedProduct.price.toFixed(2)}</span></p>
                <p>Vendor : <span>{selectedProduct.vendor}</span></p>
                <p>Stock : <span>{selectedProduct.stock}</span></p>
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop" onClick={handleCloseModal}>
            <button type="button">Close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default UniqueCategoryHolder;
