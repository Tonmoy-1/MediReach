import { FaUserCog } from "react-icons/fa";
import { MdAddCircleOutline, MdManageAccounts } from "react-icons/md";
import { FaCampground } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Admin Profile" address="/dashboard" />
      <MenuItem
        icon={MdAddCircleOutline}
        label="Add A Camp"
        address="/dashboard/add-camp"
      />
      <MenuItem
        icon={MdManageAccounts}
        label="Manage Camps"
        address="/dashboard/manage-camps"
      />
      <MenuItem
        icon={FaCampground}
        label="Manage Registered Camps"
        address="/dashboard/manage-registered-camps"
      />
    </>
  );
};

export default AdminMenu;
