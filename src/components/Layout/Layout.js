import Sidebar from "./Sidebar/Sidebar"
import { Outlet } from "react-router-dom"
import Header from "./Header/Header"
import { useSelector } from "react-redux"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

const Layout = () => {

    const selected = useSelector(state => state.settingsReducer.selected)
    const mobile = useSelector(state => state.settingsReducer.mobile)
    const controls = useAnimation()

    const [isOpen, setIsOpen] = useState(false)

    const openSidebar = e => {
        controls.set({ display: "block", x: -300 })
        controls.start({ x: 0 })
        setIsOpen(true)
    }
    const closeSidebar = e => {
        controls.set({ display: "block" })
        controls.start({ x: -300 })
        setIsOpen(false)
    }

    useEffect(() => {
        if (!mobile)
            setIsOpen(false)
    }, [mobile])

    return (
        <div className={`w-screen h-screen flex relative ${selected.theme} `}>
            <motion.div
                key={mobile}
                className={`h-full bg-white ${mobile ? "absolute z-10 hidden w-[30%]" : "w-[20%]"}`}
                animate={controls}
                transition={{ duration: 0.5 }}
            >
                <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />
            </motion.div>

            <div className="h-full w-full flex flex-grow flex-col overflow-y-auto">
                <div className="w-full px-5 border-b sticky top-0 backdrop-blur">
                    <Header openSidebar={openSidebar} />
                </div>
                <div className="w-full px-5 mb-10">
                    <Outlet />
                </div>
            </div>
        </div >
    )
}

export default Layout