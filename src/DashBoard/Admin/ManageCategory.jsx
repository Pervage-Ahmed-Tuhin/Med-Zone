import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

import Spinner from "../../components/Spinner/Spinner";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure ";
import { Helmet } from "react-helmet";

const ManageCategory = () => {
    const axiosSecure = useAxiosSecure();
    const { data: categoryData = [], isLoading, refetch } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/category`);
                return data;
            } catch (error) {
                console.error("Error fetching category data:", error);
                throw error;
            }
        },
    });

    const mutationDelete = useMutation({
        mutationFn: async (categoryId) => {
            try {
                const { data } = await axiosSecure.delete(`/category/${categoryId}`);
                return data;
            } catch (error) {
                console.error("Error deleting category:", error);
                throw error;
            }
        },
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Category deleted successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            refetch();
        },
        onError: (error) => {
            console.error("Mutation failed:", error);
        },
    });

    const mutationAdd = useMutation({
        mutationFn: async ({ category, image_url }) => {
            try {
                const { data } = await axiosSecure.post(`/category`, { category, image_url });
                return data;
            } catch (error) {
                console.error("Error adding category:", error);
                throw error;
            }
        },
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Category added successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            refetch();
        },
        onError: (error) => {
            console.error("Mutation failed:", error);
        },
    });

    const mutationUpdate = useMutation({
        mutationFn: async ({ categoryId, category, image_url }) => {
            try {
                const { data } = await axiosSecure.put(`/category/${categoryId}`, { category, image_url });
                return data;
            } catch (error) {
                console.error("Error updating category:", error);
                throw error;
            }
        },
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Category updated successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            refetch();
        },
        onError: (error) => {
            console.error("Mutation failed:", error);
        },
    });

    const handleDelete = (categoryId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                mutationDelete.mutate(categoryId);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const category = form.category.value;
        const image_url = form.image_url.value;
        mutationAdd.mutate({ category, image_url });
        form.reset();
    };

    const handleUpdateSubmit = (e, categoryId) => {
        e.preventDefault();
        const form = e.target;
        const category = form.category.value;
        const image_url = form.image_url.value;
        mutationUpdate.mutate({ categoryId, category, image_url });
        form.reset();
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div>
            <Helmet>
                <title>Multi-Vendor || ManageCategory</title>
            </Helmet>
            <h1 className="text-center text-xl font-bold mt-5 mb-6">Manage Categories</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryData.map((category) => (
                            <tr key={category._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={category.image_url} alt="Category Image" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{category.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="space-y-3">
                                    <button className="btn" onClick={() => handleDelete(category._id)}>
                                        Delete
                                    </button>
                                    <button className="btn md:ml-2 sm:mt-4 mt-0" onClick={() => document.getElementById(`update_modal_${category._id}`).showModal()}>
                                        Update
                                    </button>
                                    <dialog id={`update_modal_${category._id}`} className="modal">
                                        <div className="modal-box">
                                            <form onSubmit={(e) => handleUpdateSubmit(e, category._id)} className="card-body">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Category Name</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Category Name"
                                                        className="input input-bordered"
                                                        name="category"
                                                        defaultValue={category.category}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Image URL</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Image URL"
                                                        className="input input-bordered"
                                                        name="image_url"
                                                        defaultValue={category.image_url}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-control mt-6">
                                                    <button type="submit" className="btn btn-primary">
                                                        Update Category
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button>Close</button>
                                        </form>
                                    </dialog>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-10">
                <button className="btn" onClick={() => document.getElementById("add_modal").showModal()}>
                    Add Category
                </button>
                <dialog id="add_modal" className="modal">
                    <div className="modal-box">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category Name</span>
                                </label>
                                <input type="text" placeholder="Category Name" className="input input-bordered" name="category" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image URL</span>
                                </label>
                                <input type="text" placeholder="Image URL" className="input input-bordered" name="image_url" required />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>Close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default ManageCategory;
