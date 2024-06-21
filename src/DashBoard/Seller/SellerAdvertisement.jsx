import { useState } from 'react';
import wave2 from '../../assets/img/Polygon Luminary 2.svg';

import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';

import Spinner from '../../components/Spinner/Spinner';

import useAuth from '../../components/Hooks/useAuth';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure ';
import { Helmet } from 'react-helmet';

const SellerAdvertisement = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: advertiseData = [], isLoading, refetch } = useQuery({
        queryKey: ['advertiseData', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/bannerData/${user?.email}`);
            return data;
        },
    });

    const [photo, setPhoto] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
    });

    const handleAddition = async (e, productName) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('image', photo);
        formDataToSend.append('description', formData.description);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
                method: 'POST',
                body: formDataToSend,
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(`Failed to upload image: ${data.message}`);
            }

            const photoURL = data.data.display_url;

            const newMedicine = {
                description: formData.description,
                image_url: photoURL,
            };

            const updateResponse = await axiosSecure.put(`/updateProduct/${productName}`, newMedicine);

            console.log(newMedicine);
            if (updateResponse.data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Product updated',
                    icon: 'success',
                    confirmButtonText: 'Cool',
                });
                refetch();
            }

            setFormData({
                description: '',
            });

            setPhoto(null);

            document.getElementById('my_modal_5').close();
        } catch (error) {
            console.error('Error updating product:', error.message);

        }
    };

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    return (
        <div className="container mx-auto p-4">
            <Helmet>
                <title>Multi-Vendor||SellerAdvertisement</title>
            </Helmet>
            <h1 className="text-xl font-semibold text-center mt-3 mb-8">Your Advertised Products</h1>
            {isLoading ? (
                <Spinner />
            ) : (
                <table className="table text-xl">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Company</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {advertiseData.map((product) => (
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
                                <td>Showing</td>
                                <td>{product.vendor}</td>
                                <td>
                                    <div className="flex justify-center">
                                        <button
                                            className="btn btn-block text-white bg-red-900 outline-none border-none"
                                            onClick={() => document.getElementById('my_modal_5').showModal()}
                                        >
                                            Add Advertise
                                        </button>
                                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                            <div className="modal-box" style={{ backgroundImage: `url(${wave2})` }}>
                                                <form onSubmit={(e) => handleAddition(e, product.name)} className="md:w-full">
                                                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                                                        <div className="form-control">
                                                            <label className="label text-white">
                                                                <span className="label-text text-white text-xl">Upload Image</span>
                                                            </label>
                                                            <input
                                                                type="file"
                                                                className="file-input w-full max-w-xs"
                                                                onChange={handleFileChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <label className="label text-white">
                                                        <span className="label-text text-white text-xl">Description</span>
                                                    </label>
                                                    <textarea
                                                        className="border rounded-md p-2 focus:outline-none focus:border-blue-500 w-full"
                                                        name="description"
                                                        cols="30"
                                                        rows="10"
                                                        value={formData.description}
                                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                        placeholder="Enter your text here..."
                                                    ></textarea>
                                                    <input
                                                        type="submit"
                                                        value="confirm"
                                                        className="btn btn-block bg-red-900 text-white border-none outline-none"
                                                    />
                                                </form>
                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        <button className="btn">Close</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SellerAdvertisement;
