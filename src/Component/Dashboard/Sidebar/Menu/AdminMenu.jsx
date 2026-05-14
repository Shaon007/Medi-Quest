import { FaUserCog } from 'react-icons/fa'
import { MdCategory, MdPayment, MdBarChart, MdImage } from 'react-icons/md'
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={BsGraphUp} label='Statistics' address='/dashboard' />
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={MdCategory} label='Manage Categories' address='manage-categories' />
      <MenuItem icon={MdPayment} label='Payment Management' address='payment-management' />
      <MenuItem icon={MdBarChart} label='Sales Report' address='sales-report' />
      <MenuItem icon={MdImage} label='Manage Banners' address='manage-banners' />
    </>
  )
}

export default AdminMenu