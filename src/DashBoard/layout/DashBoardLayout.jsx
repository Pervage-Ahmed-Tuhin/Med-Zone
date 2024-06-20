// DashBoardLayout.jsx

import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './style.css'; // Add CSS to style the layout

const DashBoardLayout = () => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoardLayout;
