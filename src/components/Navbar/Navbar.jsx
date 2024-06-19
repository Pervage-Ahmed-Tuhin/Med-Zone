import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import useCart from "../Hooks/useCart";
import Swal from "sweetalert2";
const Navbar = () => {


    const { user, LogOutUser } = useAuth();

    const [cartData, refetch] = useCart();
    console.log(user);

    const handleLogout = () => {
        LogOutUser()
            .then(result => {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged out Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }


    const links = <>
        <li className="list-none"><NavLink to='/'>Home</NavLink></li>
        <li className="list-none"><NavLink to='/shop'>Shop</NavLink></li>
        <li className="list-none text-xl"><NavLink to='/cart'><FiShoppingCart /> <span className="text-sm">+{cartData.length}</span></NavLink></li>
        <select name="" id="">
            <option value="English">English</option>
            <option value="Bangla">Bangla</option>
        </select>

    </>
    return (
        <div className="navbar bg-base-100 max-w-6xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Med-Zone</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            {
                user ? <>
                    <div title={user?.displayName} className="dropdown dropdown-end ml-3 ">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <NavLink to='/updateUser' className="justify-between">
                                    Update profile
                                </NavLink>
                            </li>
                            <li><a>DashBoard</a></li>
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>

                </> : <>
                    <div className="navbar-end">
                        <button className="btn"> <NavLink to='/login'>join us</NavLink></button>
                    </div>

                </>
            }
        </div>
    );
};

export default Navbar;