import { Helmet } from 'react-helmet-async'
import AdminStatistics from '../../../Component/Dashboard/Statistics/AdminStatistics'
import SellerStatistics from '../../../Component/Dashboard/Statistics/SellerStatistics'
import useRole from '../../../Hooks/useRole'
import LoadingSpinner from '../../../Component/Shared/LoadinSpinner'
import { Navigate } from 'react-router-dom'
const Statistics = () => {
  const [role, isLoading] = useRole()
  if (isLoading) return <LoadingSpinner />
  if (role === 'customer') return <Navigate to='/dashboard/my-orders' />
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {role === 'admin' && <AdminStatistics />}
      {role === 'seller' && <SellerStatistics />}
    </div>
  )
}

export default Statistics