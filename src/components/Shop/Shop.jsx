import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import "./shop.css";
import { FaEye } from "react-icons/fa";
import { Helmet } from "react-helmet";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure ";
import useCart from "../Hooks/useCart";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth()
  const { count } = useLoaderData();
  const navigate = useNavigate();
  const [cartData, refetch] = useCart();
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  console.log(user);
  useEffect(() => {
    axios
      .get(
        `https://multi-vendor-server-eight.vercel.app/allMedicines?page=${currentPage}&size=${itemsPerPage}`
      )
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [currentPage, itemsPerPage]);


  const [selectedProduct, setSelectedProduct] = useState(null);
  const modalRef = useRef(null);
  useEffect(() => {
    if (selectedProduct && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [selectedProduct]);

  const handleViewClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

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

  const handleCartAddition = cartItem => {
    if (user && user?.email) {
      console.log("Add stuff to the database");
      console.log(cartItem);
      const { image_url, name, category, description, price, vendor, stock, _id, sellerEmail } = cartItem;
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

  return (
    <div>
      <Helmet>
        <title>Multi-Vendor||Shop</title>
      </Helmet>
      <div className="mt-20 mb-9">
        <p className="text-xl text-center">Current Page : {currentPage}</p>
        <div className="flex justify-center mt-6 pagination">
          <button onClick={handlePrevPage} className="btn mr-4">
            Prev
          </button>
          {pages.map((page) => (
            <button
              onClick={() => setCurrentPage(page)}
              className={`btn  mr-6 ${currentPage === page ? "selected" : ""}`}
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
                  <button onClick={() => handleCartAddition(product)} className="btn text-[#fe7a36] bg-white">Select</button>
                </td>
                <th>
                  <button className="btn text-xl text-[#fe7a36] bg-white" onClick={() => handleViewClick(product)}>
                    <FaEye />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>


  );
};

export default Shop;
