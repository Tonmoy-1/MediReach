import { FaChartLine, FaUserCircle } from "react-icons/fa";
import { MdListAlt } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaChartLine}
        label="Analytics"
        address="/dashboard/analytics"
      />
      <MenuItem
        icon={FaUserCircle}
        label="Participant Profile"
        address="/dashboard/participant-profile"
      />
      <MenuItem
        icon={MdListAlt}
        label="Registered Camps"
        address="/dashboard/registered-camps"
      />
      <MenuItem
        icon={GiPayMoney}
        label="Payment History"
        address="/dashboard/payment-history"
      />
    </>
  );
};

export default UserMenu;
