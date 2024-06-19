import { Navigate, useLocation } from 'react-router-dom';

import Spinner from '../Spinner/Spinner';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const location = useLocation();

    const { loader, user } = useAuth();

    console.log(location);
    if (loader) {
        return <Spinner></Spinner>

    }
    if (!user) {

        return <Navigate state={location?.pathname || '/'} to="/login"></Navigate>

    }







    return children;
};

export default PrivateRoute;
