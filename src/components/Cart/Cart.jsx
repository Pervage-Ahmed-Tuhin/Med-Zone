
import { useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure ";
import useCart from "../Hooks/useCart";
import Swal from "sweetalert2";

const Cart = () => {
    const [cartData] = useCart();
    console.log(cartData);

    const axiosSecure = useAxiosSecure();
    // Function to handle quantity update submission
    const handleSubmit = async (e, product) => {
        e.preventDefault();
        const form = e.target;
        const quantity = parseInt(form.number.value); // Convert to integer
        console.log(quantity);

        try {
            const response = await axiosSecure.patch(`/cartInformation/${product._id}`, { quantity });
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Quantity has been updated",
                    showConfirmButton: false,
                    timer: 1500
                });
              
            }

            // Update local cart data after successful update (if needed)
            // Example: You might want to update cartData in the useCart hook after a successful update

        } catch (error) {
            console.error("Error updating quantity:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Quantity could not be updated.",
            });
        }


        const updatedCartData = cartData.map(item => {
            if (item._id === product._id) {
                return { ...item, quantity }; // Update quantity for the specific product
            }
            return item;
        });

        // Log the updated cart data
        console.log(updatedCartData);
    }

    return (
        <div>
            <h1 className="text-2xl text-center font-semibold mt-8 mb-6">Your total Cart items: {cartData.length}</h1>
            <div className="mt-8 mb-6">
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
                                <th>Company</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartData.map((product) => (
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
                                    <td>{product.company}</td>
                                    <td>
                                        {/* Display current quantity and allow to update */}
                                        <button className="btn" onClick={() => document.getElementById(`my_modal_${product._id}`).showModal()}>
                                            Set Quantity
                                        </button>
                                        <dialog id={`my_modal_${product._id}`} className="modal">
                                            <div className="modal-box">
                                                <form onSubmit={(e) => handleSubmit(e, product)}>
                                                    <span>Enter Quantity: </span>
                                                    <br />
                                                    <input className="mt-5 mb-2 border" name="number" type="number" defaultValue={product.quantity} />
                                                    <br />
                                                    <button type="submit" className="btn mt-5">Submit</button>
                                                </form>
                                            </div>
                                            <form method="dialog" className="modal-backdrop">
                                                <button onClick={() => document.getElementById(`my_modal_${product._id}`).close()}>Close</button>
                                            </form>
                                        </dialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;
