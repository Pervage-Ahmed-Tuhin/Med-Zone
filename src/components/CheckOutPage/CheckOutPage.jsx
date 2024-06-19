
import useCart from "../Hooks/useCart";

const CheckOutPage = () => {
    const [cartData] = useCart();

    // Calculate the grand total
    const grandTotal = cartData.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    return (
        <div>
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
        </div>
    );
};

export default CheckOutPage;
