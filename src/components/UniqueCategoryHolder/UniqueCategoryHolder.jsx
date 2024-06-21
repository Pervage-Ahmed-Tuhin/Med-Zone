import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure ";
import useCart from "../Hooks/useCart";

const UniqueCategoryHolder = () => {
  const { category } = useParams();
  console.log(category);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth()
  const [selectedProduct, setSelectedProduct] = useState(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [cartData, refetch] = useCart();
  const {
    data: SoloCategoryData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["unique", category],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`https://multi-vendor-server-eight.vercel.app/UniqueCategory/${category}`);
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

  const handleCartAddition = cartItem => {
    if (user && user?.email) {
      console.log("Add stuff to the database");
      const { image_url, name, category, description, price, vendor, stock, _id,
        sellerEmail } = cartItem;
      const newCartItem = {
        ShopId: _id,
        image_url: image_url,
        name: name,
        email: user?.email,
        category: category,
        price: price,
        company: vendor,
        stock: stock,
        description: description,
        sellerEmail: sellerEmail
      }
      console.log(newCartItem);
      axiosSecure.post('/cartInformation', newCartItem)
        .then(res => {
          if (res.data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Medicine has been added to the cart",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })

    }
    else {
      Swal.fire({
        title: "Please log in for this functionality!",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Login",

      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate('/login');
        } else if (result.isDenied) {
          Swal.fire("Please log in for using this ", "", "feature");
        }
      });
    }
  }

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
                  <button onClick={() => handleCartAddition(product)} className="btn">Select</button>
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
