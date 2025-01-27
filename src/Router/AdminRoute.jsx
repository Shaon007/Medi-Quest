
import PropTypes from "prop-types"
import useRole from "../Hooks/useRole"
import { Navigate, useLocation } from "react-router-dom"
import LoadingSpinner from "../Component/Shared/LoadinSpinner"
import useAuth from "../Hooks/useAuth"

const AdminRoute = ({ children }) => {
  const [role, isloading] = useRole()
  const { user, loading } = useAuth()
  // const location = useLocation()

  if (isloading) return <LoadingSpinner />
  if (role === 'admin') return children
  return <Navigate to='/dashboard'  replace='true' />
}

AdminRoute.propTypes = {
  children: PropTypes.element,
}

export default AdminRoute;