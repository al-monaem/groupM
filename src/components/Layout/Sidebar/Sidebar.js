import { NavLink } from "react-router-dom"
import logo from "../../../images/Group-M.png"
import { BsGraphUp } from "react-icons/bs"
import { AiOutlineProfile, AiOutlineLaptop } from "react-icons/ai"
import { HiTicket } from "react-icons/hi"
import { HiOutlineClipboardDocument } from "react-icons/hi2"
import { FiUsers } from "react-icons/fi"
import { ImFilesEmpty } from "react-icons/im"
import { CiLogout } from "react-icons/ci"
import { IoMdClose } from "react-icons/io"

const style = {
    link: "flex w-full px-3 py-2 items-center text-[#87858f] rounded-lg hover:bg-[#f5f5f6] hover:transition",
    link_selected: "flex w-full px-3 py-2 items-center text-white rounded-lg shadow-md shadow-[#9c95ef] font-semibold bg-gradient-to-r from-[#7169e8] to-[#9c95ef]",
}

const Sidebar = ({ isOpen, closeSidebar }) => {

    return (
        <div className="flex flex-col h-full w-full px-3 border-r">

            {/* LOGO */}
            <div className="w-full mt-2 flex justify-between items-center">
                <img className="w-[60%]" src={logo} alt="Group-M" />
                {isOpen &&
                    <IoMdClose
                        onClick={() => closeSidebar()}
                        className="bg-[#7169e8] rounded-full cursor-pointer hover:bg-[#9c95ef] shadow-md shadow-[#9c95ef] p-1 w-6 h-6 text-white" />
                }
            </div>

            {/* LINKS */}
            <div className="flex flex-col justify-between text-sm mt-5 tracking-wide h-full">
                <div className="flex flex-col items-start space-y-1">
                    <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/dashboard"} exact><BsGraphUp />&nbsp;Dashboard</NavLink>
                    <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/myTickets"} exact><HiTicket />&nbsp;My Tickets</NavLink>
                    <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/myProfile"} exact><AiOutlineProfile />&nbsp;My Profile</NavLink>
                    <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/users"} exact><FiUsers />&nbsp;Users</NavLink>
                    <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/assets"} exact><AiOutlineLaptop />&nbsp;Assets</NavLink>
                    <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/ticketsType"} exact><ImFilesEmpty />&nbsp;Tickets Type</NavLink>
                    <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/ticketsQueue"} exact><HiOutlineClipboardDocument />&nbsp;Tickets Queue</NavLink>
                </div>
                <div className="mb-10">
                    <NavLink className={`${style.link} mt-auto`} to={"/"} exact><CiLogout />&nbsp;Logout</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Sidebar