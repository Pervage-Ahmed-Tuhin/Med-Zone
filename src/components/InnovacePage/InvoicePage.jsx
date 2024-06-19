import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useReactToPrint } from 'react-to-print';
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure ";


const InvoicePage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [data, setData] = useState([]);
    const componentRef = useRef();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/bookingsCollection/${user?.email}`)
                .then(res => {
                    console.log("API response:", res); // Debug log
                    setData(res.data);
                })
                .catch(error => {
                    console.error("API error:", error); // Debug log
                });
        }
    }, [axiosSecure, user?.email]);

    console.log("Fetched data:", data); // Debug log

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Invoice',
    });
    const totalCost = data.reduce((total, booking) => {
        return total + booking.cartData.reduce((sum, product) => {
            return sum + (product.price * product.quantity);
        }, 0);
    }, 0).toFixed(2);

    return (
        <div>
            <Helmet>
                <title>Multi-Vendor || InvoicePage</title>
            </Helmet>
            <div className="card w-96 bg-base-100 shadow-xl m-auto mt-11">
                <figure><img src={user.photoURL} alt="User" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Name: {user?.displayName}</h2>
                    <p>Your Purchase History is Given Below</p>
                </div>
            </div>
            <div className="overflow-x-auto mt-4">
                <div ref={componentRef} className="p-4 bg-white shadow-md">
                    <div className="text-center mb-4">
                        <h1 className="text-2xl font-bold">Med-Zone</h1>
                        <h2 className="text-2xl font-bold">Invoice</h2>
                        <h2 className="text-2xl font-bold">Total Cost: {totalCost}$</h2>
                        <p>Date: {new Date().toLocaleDateString()}</p>
                        <p>Name: {user?.displayName}</p>
                        <p>Email: {user?.email}</p>
                    </div>
                    <table className="table text-xl w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Vendor</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((booking) => (
                                booking.cartData.map((product) => (
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
                                        <td>{product.quantity}</td>
                                        <td>{product.company}</td>
                                        <td>{new Date(booking.date).toLocaleDateString()}</td> {/* Display the date */}
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-4">
                    <button onClick={handlePrint} className="btn">Print Invoice</button>
                </div>
            </div>
        </div>
    );
};

export default InvoicePage;
