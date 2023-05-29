import { NavLink } from "react-router-dom"
import logo from "../../../images/Group-M.jpg"
import { BsGraphUp } from "react-icons/bs"
import { AiOutlineProfile, AiOutlineLaptop } from "react-icons/ai"
import { HiTicket } from "react-icons/hi"
import { HiOutlineClipboardDocument } from "react-icons/hi2"
import { FiUsers } from "react-icons/fi"
import { ImFilesEmpty } from "react-icons/im"

const style = {
    link: "flex w-full px-3 py-2 items-center text-[#87858f] rounded-lg hover:bg-[#f5f5f6] hover:transition",
    link_selected: "flex w-full px-3 py-2 items-center text-white rounded-lg shadow-md shadow-[#9c95ef] font-semibold bg-gradient-to-r from-[#7169e8] to-[#9c95ef]",
}

const Sidebar = () => {
    return (
        <div className="flex flex-col h-full w-full px-3 border-r">

            {/* LOGO */}
            <div className="w-full mt-2">
                <img className="w-[60%]" src={logo} alt="Group-M" />
            </div>

            {/* LINKS */}
            <div className="flex flex-col items-start space-y-1">
                <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/dashboard"} exact><BsGraphUp />&nbsp;Dashboard</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/myTickets"} exact><HiTicket />&nbsp;My Tickets</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/myProfile"} exact><AiOutlineProfile />&nbsp;My Profile</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/users"} exact><FiUsers />&nbsp;Users</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/assets"} exact><AiOutlineLaptop />&nbsp;Assets</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/ticketsType"} exact><ImFilesEmpty />&nbsp;Tickets Type</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/ticketsQueue"} exact><HiOutlineClipboardDocument />&nbsp;Tickets Queue</NavLink>
            </div>

        </div>
    )
}

export default Sidebar