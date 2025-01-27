import PropTypes from "prop-types"
import useRole from "../Hooks/useRole"
import { Navigate, useLocation } from "react-router-dom"
import LoadingSpinner from "../Component/Shared/LoadinSpinner"
import useAuth from "../Hooks/useAuth"

const SellerRoute = ({ children }) => {
  const [role, isloading] = useRole()
  const { user, loading } = useAuth()
  // const location = useLocation()

  if (isloading) return <LoadingSpinner />
  if (role === 'seller') return children
  return <Navigate to='/dashboard' state={{ from: location }} replace='true' />
}

SellerRoute.propTypes = {
  children: PropTypes.element,
}


export default SellerRoute;