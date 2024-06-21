

import { useEffect, useState } from "react";

import wave2 from '../../assets/img/Polygon Luminary 2.svg';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure ";
import useAuth from "../../components/Hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";

const ManageMedicine = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [photo, setPhoto] = useState(null);

    const { data: sellerData = [], isLoading, refetch } = useQuery({
        queryKey: ["seller-items"],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/medicine/${user?.email}`);
                return data;
            } catch (error) {
                console.error("Error fetching user data:", error);
                throw error;
            }
        },
    });
    useEffect(() => {
        refetch();
    }, [])

    const handleAddition = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const price = form.price.value;
        const stock = form.stock.value;
        const vendor = form.vendor.value;
        const sellerEmail = form.sellerEmail.value;
        const discountStatus = form.discountStatus.value;
        const category = form.category.value;
        const itemMassUnit = form.itemMassUnit.value;
        const description = form.description.value;

        const formData = new FormData();
        formData.append('image', photo); // Assuming `photo` is a File object

        try {
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );
            const photoURL = response.data.data.display_url;

            const newMedicine = {
                name,
                price: parseFloat(price),
                stock: parseInt(stock),
                vendor,
                sellerEmail,
                discountStatus: discountStatus === "true",
                category,
                itemMassUnit,
                description,
                image_url: photoURL,
            };

            const res = await axiosSecure.post('/medicine', newMedicine);
            console.log(res.data);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "your item has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            refetch(); // Refetch seller data to update the UI
        } catch (error) {
            console.error("Error uploading image or saving data:", error);
        }
    };

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    if (sellerData.length === 0) {
        return (
            <>
                <p className="text-xl text-center font-semibold">You do not have any products that is being sold in the website</p>
                <div className="flex justify-center mt-5">
                    <button className="btn btn-block text-white bg-red-900 outline-none border-none" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Item</button>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box" style={{ backgroundImage: `url(${wave2})` }}>
                            <form onSubmit={handleAddition} className="md:w-full">
                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                    <div className="form-control">
                                        <label className="label text-white">
                                            <span className="label-text text-white text-xl">Upload Image</span>
                                        </label>
                                        <input type="file" className="file-input w-full max-w-xs" onChange={handleFileChange} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label text-white">
                                            <span className="label-text text-white text-xl">Name</span>
                                        </label>
                                        <label className="input-group">
                                            <input type="text" name="name" className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                    <div className="form-control">
                                        <label className="label text-white">
                                            <span className="label-text text-white text-xl">Price</span>
                                        </label>
                                        <label className="input-group">
                                            <input type="text" name="price" className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label text-white">
                                            <span className="label-text text-white text-xl">Stock</span>
                                        </label>
                                        <label className="input-group">
                                            <input type="text" name="stock" className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                    <div className="form-control">
                                        <label className="label text-white">
                                            <span className="label-text text-white text-xl">Company</span>
                                        </label>
                                        <label className="input-group">
                                            <input type="text" name="vendor" className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label text-white">
                                            <span className="label-text text-white text-xl">Seller Email</span>
                                        </label>
                                        <label className="input-group">
                                            <input type="text" name="sellerEmail" defaultValue={user?.email} className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label text-white">
                                            <span className="label-text text-white text-xl">Discount Status</span>
                                        </label>
                                        <label className="input-group">
                                            <select className="h-10 w-full rounded-lg" name="discountStatus">
                                                <option value="true">true</option>
                                                <option value="false">false</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                    <div className="form-control">
                                        <label className="label text-white">
                                            <span className="label-text text-white text-xl">Category</span>
                                        </label>
                                        <label className="input-group">
                                            <select className="h-10 w-full rounded-lg" name="category">
                                                <option value="Prescription Medicines">Prescription Medicines</option>
                                                <option value="Baby Care">Baby Care</option>
                                                <option value="Personal Care">Personal Care</option>
                                                <option value="Vitamins & Supplements">Vitamins & Supplements</option>
                                                <option value="Over-the-Counter Medicines">Over-the-Counter Medicines</option>
                                                <option value="Herbal Medicines">Herbal Medicines</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label text-white">
                                            <span className="label-text text-white text-xl">Item Mass Unit</span>
                                        </label>
                                        <label className="input-group">
                                            <input type="text" name="itemMassUnit" defaultValue="MG Or ML" className="input input-bordered w-full" />
                                        </label>
                                    </div>
                                </div>
                                <label className="label text-white">
                                    <span className="label-text text-white text-xl">Description</span>
                                </label>
                                <textarea className="border rounded-md p-2 focus:outline-none focus:border-blue-500 w-full" name="description" cols="30" rows="10" placeholder="Enter your text here..."></textarea>
                                <input type="submit" value="Add Item" className="btn btn-block bg-red-900 text-white border-none outline-none" />
                            </form>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </>
        );
    }

    return (
        <div>
            <h1 className="text-xl font-semibold text-center mb-7">This is the manage medicine page</h1>
            <table className="table text-xl">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Company</th>

                    </tr>
                </thead>
                <tbody>
                    {sellerData.map((product) => (
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


                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-5">
                <button className="btn btn-block text-white bg-red-900 outline-none border-none" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Item</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box" style={{ backgroundImage: `url(${wave2})` }}>
                        <form onSubmit={handleAddition} className="md:w-full">
                            <div className="grid md:grid-cols-2 gap-4 mb-8">
                                <div className="form-control">
                                    <label className="label text-white">
                                        <span className="label-text text-white text-xl">Upload Image</span>
                                    </label>
                                    <input type="file" className="file-input w-full max-w-xs" onChange={handleFileChange} />
                                </div>
                                <div className="form-control">
                                    <label className="label text-white">
                                        <span className="label-text text-white text-xl">Name</span>
                                    </label>
                                    <label className="input-group">
                                        <input type="text" name="name" className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 mb-8">
                                <div className="form-control">
                                    <label className="label text-white">
                                        <span className="label-text text-white text-xl">Price</span>
                                    </label>
                                    <label className="input-group">
                                        <input type="text" name="price" className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label text-white">
                                        <span className="label-text text-white text-xl">Stock</span>
                                    </label>
                                    <label className="input-group">
                                        <input type="text" name="stock" className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 mb-8">
                                <div className="form-control">
                                    <label className="label text-white">
                                        <span className="label-text text-white text-xl">Company</span>
                                    </label>
                                    <label className="input-group">
                                        <input type="text" name="vendor" className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label text-white">
                                        <span className="label-text text-white text-xl">Seller Email</span>
                                    </label>
                                    <label className="input-group">
                                        <input type="text" name="sellerEmail" defaultValue={user?.email} className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label text-white">
                                        <span className="label-text text-white text-xl">Discount Status</span>
                                    </label>
                                    <label className="input-group">
                                        <select className="h-10 w-full rounded-lg" name="discountStatus">
                                            <option value="true">true</option>
                                            <option value="false">false</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 mb-8">
                                <div className="form-control">
                                    <label className="label text-white">
                                        <span className="label-text text-white text-xl">Category</span>
                                    </label>
                                    <label className="input-group">
                                        <select className="h-10 w-full rounded-lg" name="category">
                                            <option value="Prescription Medicines">Prescription Medicines</option>
                                            <option value="Baby Care">Baby Care</option>
                                            <option value="Personal Care">Personal Care</option>
                                            <option value="Vitamins & Supplements">Vitamins & Supplements</option>
                                            <option value="Over-the-Counter Medicines">Over-the-Counter Medicines</option>
                                            <option value="Herbal Medicines">Herbal Medicines</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label text-white">
                                        <span className="label-text text-white text-xl">Item Mass Unit</span>
                                    </label>
                                    <label className="input-group">
                                        <input type="text" name="itemMassUnit" defaultValue="MG Or ML" className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>
                            <label className="label text-white">
                                <span className="label-text text-white text-xl">Description</span>
                            </label>
                            <textarea className="border rounded-md p-2 focus:outline-none focus:border-blue-500 w-full" name="description" cols="30" rows="10" placeholder="Enter your text here..."></textarea>
                            <input type="submit" value="Add Item" className="btn btn-block bg-red-900 text-white border-none outline-none" />
                        </form>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ManageMedicine;
