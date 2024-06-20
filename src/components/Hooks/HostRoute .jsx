import { Navigate } from 'react-router-dom'

import useRole from './useRole'
import Spinner from '../Spinner/Spinner'


const HostRoute = ({ children }) => {
    const [role, isLoading] = useRole()

    if (isLoading) return <Spinner></Spinner>
    if (role === 'seller') return children
    return <Navigate to='/dashboard' />
}

export default HostRoute
