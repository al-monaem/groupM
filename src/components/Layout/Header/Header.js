import me from "../../../images/me.png"

const Header = () => {
    return (
        <div className="w-full flex py-5">
            <div className="ml-auto rounded-full">
                <img className="w-10 h-10 shadow-md shadow-[#7169e8] rounded-full" src={me} alt="AL-MONAEM KHAN" />
            </div>
        </div>
    )
}

export default Header