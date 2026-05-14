import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory, MdPayment, MdAdsClick } from 'react-icons/md'
import MenuItem from './MenuItem'
const SellerMenu = () => {
  return (
    <>
      <MenuItem icon={BsFillHouseAddFill} label='Add Medicine' address='add-med' />
      <MenuItem icon={MdHomeWork} label='My Inventory' address='my-inventory' />
      <MenuItem icon={MdOutlineManageHistory} label='Manage Orders' address='manage-orders' />
      <MenuItem icon={MdPayment} label='Payment History' address='seller-payment-history' />
      <MenuItem icon={MdAdsClick} label='Ask for Advertisement' address='ask-for-advertisement' />
    </>
  )
}

export default SellerMenu