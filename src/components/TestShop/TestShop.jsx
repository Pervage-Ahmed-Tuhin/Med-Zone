import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import "./shop.css";
import { FaEye } from "react-icons/fa";
import { Helmet } from "react-helmet";

import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure ";
import useAuth from "../Hooks/useAuth";
import useCart from "../Hooks/useCart";

const TestShop = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { count } = useLoaderData();
    const navigate = useNavigate();
    const [cartData, refetch] = useCart();
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

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

    const handleCartAddition = (cartItem) => {
        if (user && user?.email) {
            const { image_url, name, category, description, price, vendor, stock, _id, sellerEmail } = cartItem;
            const newCartItem = {
                ShopId: _id,
                image_url,
                name,
                email: user?.email,
                category,
                price,
                company: vendor,
                stock,
                description,
                sellerEmail,
            };
            axiosSecure.post('/cartInformation', newCartItem).then((res) => {
                if (res.data.insertedId) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Medicine has been added to the cart",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
        } else {
            Swal.fire({
                title: "Please log in for this functionality!",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Login",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                } else if (result.isDenied) {
                    Swal.fire("Please log in for using this feature", "", "info");
                }
            });
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedProducts = filteredProducts.sort((a, b) => {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

    return (
        <div>
            <Helmet>
                <title>Multi-Vendor || Shop</title>
            </Helmet>
            <div className="mt-20 mb-9 p-4">
                <div className="text-center mb-4">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>
                <div className="text-center mb-4">
                    <label htmlFor="sortOrder" className="mr-2">Sort by price:</label>
                    <select
                        id="sortOrder"
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                        className="select select-bordered"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <p className="text-xl text-center">Current Page: {currentPage}</p>
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
            <div className="overflow-x-auto">
                <table className="table text-xl">
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
                        {sortedProducts.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.image_url} alt={product.name} />
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
                                    <button
                                        onClick={() => handleCartAddition(product)}
                                        className="btn text-[#fe7a36] bg-white"
                                    >
                                        Select
                                    </button>
                                </td>
                                <th>
                                    <button
                                        className="btn text-xl text-[#fe7a36] bg-white"
                                        onClick={() => handleViewClick(product)}
                                    >
                                        <FaEye />
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedProduct && (
                    <dialog id="my_modal_2" className="modal" ref={modalRef}>
                        <div className="modal-box">
                            <div className="card card-compact bg-base-100 shadow-xl">
                                <figure>
                                    <img src={selectedProduct.image_url} alt="Product" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">Name: {selectedProduct.name}</h2>
                                    <h2 className="card-title">Category: {selectedProduct.category}</h2>
                                    <p>Description: {selectedProduct.description}</p>
                                    <p>Price: <span>${selectedProduct.price.toFixed(2)}</span></p>
                                    <p>Vendor: <span>{selectedProduct.vendor}</span></p>
                                    <p>Stock: <span>{selectedProduct.stock}</span></p>
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

export default TestShop;
