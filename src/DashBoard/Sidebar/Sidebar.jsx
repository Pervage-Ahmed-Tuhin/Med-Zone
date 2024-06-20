// Sidebar.jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import useRole from '../../components/Hooks/useRole';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const [role] = useRole();
    console.log(role);

    return (
        <div>
            <button className="toggle-button" onClick={toggleSidebar}>
                ☰
            </button>
            <div className={`sidebar ${isOpen ? 'open' : ''} flex flex-col justify-between`}>
                {role === 'admin' ? <div className='mt-14'>
                    <ul>
                        <li>
                            <NavLink to="/dashboard" exact end activeClassName="active">
                                AdminHome
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/manage-users" activeClassName="active">
                                Manage Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/manage-category" activeClassName="active">
                                Manage Category
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/payment-manage" activeClassName="active">
                                Payment Manage
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/sales-report" activeClassName="active">
                                Sales Report
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/manage-banner" activeClassName="active">
                                Manage Banner
                            </NavLink>
                        </li>
                    </ul>
                </div> : <></>}

                {role === 'seller' ? <div>
                    <ul>
                        <li>
                            <NavLink to="/dashboard" exact end activeClassName="active">
                                SellerHome
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/manage-users" activeClassName="active">
                                Manage medicine
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/manage-category" activeClassName="active">
                                PaymentHistory
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/payment-manage" activeClassName="active">
                                AskForAdvertiseMent
                            </NavLink>
                        </li>

                    </ul>


                </div> : <></>}

                {role === 'user' ? <div>
                    <ul>
                        <li>
                            <NavLink to="/dashboard" exact end activeClassName="active">
                                PaymentHistory
                            </NavLink>
                        </li>

                    </ul>
                </div> : <></>}
                <div>
                    <ul>
                        <li>
                            <NavLink exact activeClassName="active" to='/'>Home</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
