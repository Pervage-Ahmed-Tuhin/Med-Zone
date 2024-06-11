import './footer.css';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaSquareXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className="footer-distributed"

        


    >

        <div className="footer-left">
            <h3>Med-<span>Zone</span></h3>

            <p className="footer-links">
                <Link to="/">Home</Link>
                |
                <Link to="/login" >Login</Link>
                |
                <Link to="/register" >Register</Link>
                |
                <Link to="/updateProfile" >Update User</Link>
            </p>

            <p className="footer-company-name">Copyright © 2021 <strong>Med-Zone</strong> All rights reserved</p>
        </div>

        <div className="footer-center">
            <div>
                <i className="fa fa-map-marker"></i>
                <p><span>Dhaka</span>
                    Bangladesh</p>
            </div>

            <div>
                <i className="fa fa-phone"></i>
                <p>+880-1641281589</p>
            </div>
            <div>
                <i className="fa fa-envelope"></i>
                <p><a href="mailto:clashroyaltuhin13@gmail.com">clashroyaltuhin13@gmail.com</a></p>
            </div>
        </div>
        <div className="footer-right">
            <p className="footer-company-about">
                <span>About the company</span>
                <strong>Med-Zone</strong> is a multi national Medicine selling company. admired for our top of the line support!!

            </p>
            <div className="footer-icons">
                <a href="#"><FaFacebook /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaSquareXTwitter /></a>
                <a href="#"><FaLinkedinIn /></a>
            </div>
        </div>
    </footer>

    );
};

export default Footer;