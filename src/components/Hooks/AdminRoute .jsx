import { Navigate } from 'react-router-dom'


import Spinner from '../Spinner/Spinner';
import useRole from './useRole';



const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole();

    if (isLoading) return <Spinner></Spinner>
    if (role === 'admin') return children
    return <Navigate to='/dashboard' />
}

export default AdminRoute

