import { IoMdAdd } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { BiEdit } from "react-icons/bi"
import { HiOutlineTrash } from "react-icons/hi"
import { IoIosArrowBack } from "react-icons/io"
import { IoIosArrowForward } from "react-icons/io"

import "./ticketsType.css"
import { useEffect, useRef, useState } from "react"
import { add, deleteTicketType, update } from "../../../app/redux/AdminSlices/TicketsTypeSlice"
import ConfirmModal from "../../ConfirmModal"
import CreateModal from "../../CreateModal"

import { handleButtonRef, addTicket, calculateLinks, handleEdit, handlePagination } from "../../../app/Controllers/TicketsTypeController"
import MobileModal from "../../MobileModal"

const TicketsType = () => {
    const ticketsType = useSelector(state => state.ticketsTypeReducer.ticketsType)
    const totalTypes = useSelector(state => state.ticketsTypeReducer.totalTypes)
    const mobile = useSelector(state => state.settingsReducer.mobile)
    const dispatch = useDispatch()

    const [modalOpen, setModalOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [type, setType] = useState("")
    const [description, setDescription] = useState("")
    const [id, setId] = useState("")
    const [limit, setLimit] = useState(5)
    const [start, setStart] = useState(1)
    const [end, setEnd] = useState(totalTypes)
    const [links, setLinks] = useState([1])
    const [selectedLink, setSelectedLink] = useState("1")
    const [filteredTicketsType, setFilteredTicketsType] = useState(ticketsType.slice(0, limit))
    const [confirmDelete, setConfirmDelete] = useState("")
    const [mobileModalOpen, setMobileModalOpen] = useState(false)

    const buttonRefs = useRef([]);

    const confirmAction = e => {
        if (e.currentTarget.id === "yes") {
            dispatch(deleteTicketType({
                id: confirmDelete
            }))
        }
        setConfirmDelete("")
        setMobileModalOpen(false)
    }
    const submitTicket = (e) => {
        e.preventDefault()

        const data = {
            type: type,
            description: description
        }

        dispatch(add(data))
        setType("")
        setDescription("")

        setModalOpen(false)
    }
    const saveChanges = e => {
        e.preventDefault()

        const data = {
            id: id,
            type: type,
            description: description
        }

        dispatch(update(data))
        setModalOpen(false)
    }

    useEffect(() => {
        setMobileModalOpen(false)
        setModalOpen(false)
    }, [mobile])

    useEffect(() => {
        setEnd(totalTypes)
        return () => {
            console.log("Unmount")
        }
    }, [totalTypes])
    useEffect(() => {
        setSelectedLink("1")
        setStart(1)
        calculateLinks("1", totalTypes, limit, setLinks, setEnd)
        return () => {
            console.log("Unmount")
        }
    }, [limit])
    useEffect(() => {
        if (start > end && start !== 0) {
            setStart(start - limit)
            setSelectedLink((parseInt(selectedLink) - 1).toString())
        }
        setFilteredTicketsType(ticketsType.slice(start - 1, end))
        return () => {
            console.log("Unmount")
        }
    }, [start, end])
    useEffect(() => {
        setFilteredTicketsType(ticketsType.slice(start - 1, end))
        calculateLinks(selectedLink, totalTypes, limit, setLinks, setEnd)
        return () => {
            console.log("Unmount")
        }
    }, [ticketsType])

    const props = {
        modalOpen,
        setModalOpen,
        setDescription,
        setType,
        submitTicket,
        saveChanges,
        type,
        description,
        isEdit
    }

    return (
        <>
            <div className={`w-full h-full border rounded-lg my-5 ${mobile ? "text-sm" : ""}`}>
                {/* CREATE */}
                <div className="p-5 flex justify-between items-center border-b">
                    <div className="flex items-center space-x-3">
                        <select
                            onChange={e => setLimit(e.target.value)}
                            className="text-[#9e9ca4] border rounded-lg px-4 py-2">
                            <option defaultValue={5} value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </select>
                        <button
                            onClick={() => addTicket(setIsEdit, setId, setType, setDescription, setModalOpen)}
                            className="flex hover:bg-[#9c95ef] transition items-center px-3 py-2 bg-[#7169e8] text-white rounded-lg font-semibold">
                            <IoMdAdd /> Add Ticket Type
                        </button>
                    </div>

                </div>
                {/* LIST */}
                <table className="w-full table-auto text-[#73707c]">
                    <thead>
                        <tr className="border-b font-semibold tracking-wider">
                            <td>#ID</td>
                            <td>Ticket Type</td>
                            <td>Description</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTicketsType.map((ticket, index) => {
                            return (
                                <tr className="border-b" key={ticket.id}>
                                    <td className="text-[#7169e8]">#{ticket.id}</td>
                                    <td>{ticket.type}</td>
                                    <td>{ticket.description}</td>
                                    <td className="flex items-center space-x-2">
                                        <BiEdit
                                            id={ticket.id}
                                            onClick={e => handleEdit(e, ticketsType, setType, setId, setDescription, setIsEdit, setModalOpen)}
                                            className="p-2 w-8 h-8 hover:cursor-pointer rounded-full transition hover:shadow-md hover:bg-[#7169e8] hover:text-white" />
                                        <div>
                                            <button
                                                id={ticket.id}
                                                ref={(ref) => handleButtonRef(index, ref, buttonRefs)}
                                                className="relative p-2 w-8 h-8 hover:cursor-pointer rounded-full transition hover:shadow-md hover:bg-red-500 hover:text-white"
                                                onClick={e => {
                                                    if (mobile)
                                                        setMobileModalOpen(true)
                                                    setConfirmDelete(e.currentTarget.id)
                                                }}
                                            >
                                                <HiOutlineTrash />
                                            </button>
                                            {confirmDelete === ticket.id && !mobile &&
                                                <ConfirmModal buttonRef={buttonRefs.current[index]} confirmAction={confirmAction} />
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <MobileModal mobileModalOpen={mobileModalOpen} confirmAction={confirmAction} />
                </table>
                {/* PAGINATION */}
                <div className="text-[#73707c] pt-5 pl-5 flex justify-between items-center">
                    {!mobile &&
                        <div className="text-[#bbb9bf] text-sm">
                            Showing {start} to {end} of {totalTypes} entries.
                        </div>
                    }
                    <div className="pr-10 flex space-x-2 items-center">
                        <IoIosArrowBack
                            onClick={() => handlePagination((parseInt(selectedLink) - 1).toString(), setStart, setEnd, setSelectedLink, totalTypes, limit)}
                            className={`hover:cursor-pointer hover:bg-[#7169e8] transtition hover:text-white font-semibold bg-[#e8e8e9] rounded-full border p-1 ${mobile ? "w-6 h-6" : "w-8 h-8"} ${selectedLink === links[0].toString() ? "disabled pointer-events-none text-[#bbb9bf]" : ""}`} />
                        {links.map((link) => {
                            return (
                                <button
                                    id={link}
                                    key={link}
                                    onClick={e => handlePagination(e.target.id, setStart, setEnd, setSelectedLink, totalTypes, limit)}
                                    className={`font-semibold rounded-md border px-3 py-1 ${selectedLink === link.toString() ? "text-white bg-[#7169e8]" : "bg-[#e8e8e9]"}`}>{link}</button>
                            )
                        })}
                        <IoIosArrowForward
                            onClick={() => handlePagination((parseInt(selectedLink) + 1).toString(), setStart, setEnd, setSelectedLink, totalTypes, limit)}
                            className={`hover:cursor-pointer hover:bg-[#7169e8] transition hover:text-white font-semibold bg-[#e8e8e9] rounded-full border p-1 ${mobile ? "w-6 h-6" : "w-8 h-8"} ${selectedLink === links[links.length - 1].toString() ? "disabled pointer-events-none text-[#bbb9bf]" : ""}`} />
                    </div>
                </div>

            </div>

            {/* MODAL */}
            <CreateModal props={props} />
        </>
    )
}

export default TicketsType