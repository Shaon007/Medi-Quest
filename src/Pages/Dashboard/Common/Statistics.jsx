import { Helmet } from 'react-helmet-async'
import AdminStatistics from '../../../Component/Dashboard/Statistics/AdminStatistics'
const Statistics = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <AdminStatistics />
    </div>
  )
}

export default Statistics