import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";



import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure ";
import Swal from "sweetalert2";

const ManageBanner = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const axiosSecure = useAxiosSecure();

    const { count } = useLoaderData(); // Assuming this hook provides total count
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    useEffect(() => {
        fetchProducts();
    }, [currentPage, itemsPerPage]);

    const fetchProducts = async () => {
        try {
            const response = await axiosSecure.get(`/allMedicines?page=${currentPage}&size=${itemsPerPage}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
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

    // const toggleSliderStatus = async (productId) => {
    //     const productIndex = products.findIndex(product => product._id === productId);
    //     if (productIndex === -1) return;

    //     const updatedProducts = [...products];
    //     const updatedProduct = { ...updatedProducts[productIndex] };

    //     // Toggle inSlider status
    //     updatedProduct.inSlider = !updatedProduct.inSlider;

    //     updatedProducts[productIndex] = updatedProduct;
    //     setProducts(updatedProducts);
    //     try {
    //         if (updatedProduct.inSlider) {
    //             const response = await axiosSecure.post(`/addToSlider`, updatedProduct);
    //             if (response.data.insertedId) {
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: "Added to the banner",
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //             }
    //             console.log("Product added to slider:", updatedProduct);
    //         } else {
    //             const response = await axiosSecure.delete(`/removeFromSlider/${updatedProduct._id}`);
    //             if (response.data.deletedCount > 0) {
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: "Removed from the banner section",
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //             }
    //             console.log("Product removed from slider:", updatedProduct);
    //         }
    //     } catch (error) {
    //         console.error("Error updating slider status:", error);
    //         Swal.fire({
    //             icon: "error",
    //             title: "Oops...",
    //             text: "Something went wrong!",
    //             footer: "Please try again later"
    //         });
    //     }
    // };
    const toggleSliderStatus = async (productId) => {
        const productIndex = products.findIndex((product) => product._id === productId);
        if (productIndex === -1) return;

        const updatedProducts = [...products];
        const updatedProduct = { ...updatedProducts[productIndex] };

        // Toggle inSlider status
        updatedProduct.inSlider = !updatedProduct.inSlider;

        updatedProducts[productIndex] = updatedProduct;
        setProducts(updatedProducts);
        try {
            if (updatedProduct.inSlider) {
                const response = await axiosSecure.post(`/addToSlider`, updatedProduct);
                if (response.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Added to the banner",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                console.log("Product added to slider:", updatedProduct);
            } else {
                const response = await axiosSecure.delete(`/removeFromSlider`, {
                    params: { productName: updatedProduct.name },
                });
                if (response.data.deletedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Removed from the banner section",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                console.log("Product removed from slider:", updatedProduct);
            }
        } catch (error) {
            console.error("Error updating slider status:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: "Please try again later"
            });
        }
    };
    return (
        <div>
            <Helmet>
                <title>Multi-Vendor Shop</title>
            </Helmet>
            <div className="mt-20 mb-9">
                <p className="text-xl text-center">Current Page : {currentPage}</p>
                <div className="flex justify-center mt-6 pagination">
                    <button onClick={handlePrevPage} className="btn mr-4">
                        Prev
                    </button>
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn mr-6 ${currentPage === page ? "selected" : ""}`}
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
                            <th>SellerEmail</th>
                            <th>Action</th>
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
                                <td>{product.sellerEmail}</td>
                                <td>
                                    <button
                                        className="btn"
                                        onClick={() => toggleSliderStatus(product._id)}
                                    >
                                        {product.inSlider ? "Remove from Slider" : "Add to Slider"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBanner;
