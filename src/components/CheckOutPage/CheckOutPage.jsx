
import { Helmet } from "react-helmet";
import useCart from "../Hooks/useCart";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
const CheckOutPage = () => {
    const [cartData] = useCart();
    const hasInvalidQuantity = cartData.some(item => item.quantity === undefined || item.quantity === 0);
    // Calculate the grand total
    const grandTotal = cartData.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    if (hasInvalidQuantity) {
        return (
            <div>
                <Helmet>
                    <title>Multi-Vendor||CheckOut</title>
                </Helmet>
                <div className="text-center mt-8">
                    <h1 className="text-2xl font-semibold mb-6">Invalid Quantities Detected</h1>
                    <p className="text-xl mb-6">Please go back to the cart and select the quantity for each item.</p>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => window.history.back()}
                    >
                        Go Back to Cart
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>Multi-Vendor||CheckOut</title>
            </Helmet>
            <h1 className="text-2xl text-center font-semibold mt-8 mb-6">Your Total Cost is: ${grandTotal.toFixed(2)}</h1>
            <div className="mt-8 mb-6">
                {/* Display cart items */}
                <div className="overflow-x-auto">
                    <table className="table text-xl">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Company</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartData.map((product) => (
                                <tr key={product._id}>

                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.description}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>{product.company}</td>
                                    <td>{product.quantity}</td>
                                    <td>${(product.price * product.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Elements stripe={stripePromise}>
                {/* checkout form */}
                <CheckoutForm
                    grandTotal={grandTotal}
                />
            </Elements>

        </div>
    );
};

export default CheckOutPage;
