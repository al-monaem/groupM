import { useSelector } from "react-redux"
import me from "../../../images/me.png"
import { GrMenu } from "react-icons/gr"

const Header = ({ openSidebar }) => {

    const mobile = useSelector(state => state.settingsReducer.mobile)

    return (
        <div className={`w-full flex py-5 items-center ${mobile ? "text-sm" : ""}`}>
            {mobile &&
                <div className="rounded-full">
                    <GrMenu
                        onClick={e => openSidebar()}
                        className="p-2 hover:bg-[#f5f5f6] cursor-pointer transition w-10 h-10 rounded-full" />
                </div>
            }
            <div className="ml-auto rounded-full">
                <img className="w-10 h-10 shadow-md shadow-[#7169e8] rounded-full" src={me} alt="AL-MONAEM KHAN" />
            </div>
        </div>
    )
}

export default Header