import Sidebar from "./Sidebar/Sidebar"
import { Outlet } from "react-router-dom"
import Header from "./Header/Header"

const Layout = () => {
    return (
        <div className="w-screen h-screen flex fixed">
            <div className="h-full w-[20%]">
                <Sidebar />
            </div>
            <div className="h-full w-full flex flex-grow flex-col overflow-y-auto">
                <div className="w-full px-5 border-b sticky top-0 backdrop-blur">
                    <Header />
                </div>
                <div className="w-full px-5 mb-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout