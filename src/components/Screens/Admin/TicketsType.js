import { IoMdAdd } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"

import { BiEdit } from "react-icons/bi"
import { HiOutlineTrash } from "react-icons/hi"

import "./ticketsType.css"
import Modal from "react-modal"
import { useEffect, useState } from "react"
import { add, update } from "../../../app/redux/AdminSlices/TicketsTypeSlice"

const TicketsType = () => {

    Modal.setAppElement("#root")

    const ticketsType = useSelector(state => state.ticketsTypeReducer.ticketsType)
    const totalTypes = useSelector(state => state.ticketsTypeReducer.totalTypes)

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

    const onChangeLimit = e => {
        setLimit(e.target.value)
    }

    const calculateLinks = (add) => {
        if (totalTypes > limit) {
            let range = 0
            range = totalTypes / limit
            let l = []
            for (let index = 0; index < range; index++) {
                l.push(index + 1)
            }
            setLinks(l)
            if (selectedLink !== "1") {
                if (selectedLink * limit <= totalTypes) {
                    setEnd(selectedLink * limit)
                }
            } else
                setEnd(limit)
        }
        else {
            setEnd(totalTypes)
            setLinks([1])
        }
    }

    useEffect(() => {
        setEnd(totalTypes)
    }, [totalTypes])
    useEffect(() => {
        calculateLinks()
        setSelectedLink("1")
        setStart(1)
    }, [limit])
    useEffect(() => {
        setFilteredTicketsType(ticketsType.slice(start - 1, end))
    }, [start, end])
    useEffect(() => {
        setFilteredTicketsType(ticketsType.slice(start - 1, end))
        calculateLinks(true)
    }, [ticketsType])

    const addTicket = e => {
        setIsEdit(false)

        setId("")
        setType("")
        setDescription("")

        setModalOpen(true)
    }

    const submitTicket = e => {
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

    const handleEdit = e => {
        const ticket = ticketsType.find(ticket => ticket.id === e.target.id)

        console.log(ticket)

        if (ticket) {
            setType(ticket.type)
            setId(ticket.id)
            setDescription(ticket.description)

            setIsEdit(true)
            setModalOpen(true)
        }
    }

    const handleDelete = e => {

    }

    const handlePagination = id => {
        const link = id
        setSelectedLink(link)

        setStart((link - 1) * limit + 1)
        const endTicket = (link * limit)

        console.log(endTicket)

        if (endTicket > totalTypes) {
            setEnd(totalTypes)
        } else {
            setEnd(endTicket)
        }
    }

    return (
        <>
            <div className="w-full h-full border rounded-lg my-5">
                {/* CREATE */}
                <div className="p-5 flex justify-between items-center border-b">
                    <div className="flex items-center space-x-3">
                        <select
                            onChange={e => onChangeLimit(e)}
                            className="text-[#9e9ca4] border rounded-lg px-4 py-2">
                            <option selected value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </select>
                        <button
                            onClick={e => addTicket(e)}
                            className="flex hover:bg-[#9c95ef] transition items-center px-3 py-2 bg-[#7169e8] text-white rounded-lg font-semibold">
                            <IoMdAdd /> Add Ticket Type
                        </button>
                    </div>
                    <div>
                        <form onSubmit={e => e.preventDefault()}>
                            <input className="px-3 py-2 border rounded-lg focus:outline-[#7169e8] transition" placeholder="Search Ticket Type" />
                            <input hidden type="submit" />
                        </form>
                    </div>
                </div>
                {/* LIST */}
                <table className="w-full table-auto text-[#73707c]">
                    <tr className="border-b font-semibold tracking-wider">
                        <td>#ID</td>
                        <td>Ticket Type</td>
                        <td>Description</td>
                        <td>Action</td>
                    </tr>
                    {filteredTicketsType.map((ticket) => {
                        return (
                            <tr className="border-b" key={ticket.id}>
                                <td className="text-[#7169e8]">#{ticket.id}</td>
                                <td>{ticket.type}</td>
                                <td>{ticket.description}</td>
                                <td className="flex items-center space-x-2">
                                    <BiEdit
                                        id={ticket.id}
                                        onClick={e => handleEdit(e)}
                                        className="p-2 w-8 h-8 hover:cursor-pointer rounded-full transition hover:shadow-md hover:bg-[#7169e8] hover:text-white" />
                                    <HiOutlineTrash
                                        id={ticket.id}
                                        onClick={e => handleDelete(e)}
                                        className="p-2 w-8 h-8 hover:cursor-pointer rounded-full transition hover:shadow-md hover:bg-red-500 hover:text-white" />
                                </td>
                            </tr>
                        )
                    })}
                </table>
                {/* PAGINATION */}
                <div className="text-[#73707c] pt-5 pl-5 flex justify-between items-center">
                    <div className="text-[#bbb9bf] text-sm">
                        Showing {start} to {end} of {totalTypes} entries.
                    </div>
                    <div className="pr-10 flex space-x-2 items-center">
                        <button className={`font-semibold bg-[#e8e8e9] rounded-md border px-3 py-1 ${selectedLink === links[0].toString() ? "disabled text-[#bbb9bf]" : ""}`}>Previous</button>
                        {links.map((link) => {
                            return (
                                <button
                                    id={link}
                                    key={link}
                                    onClick={e => handlePagination(e.target.id)}
                                    className={`font-semibold rounded-md border px-3 py-1 ${selectedLink === link.toString() ? "text-white bg-[#7169e8]" : "bg-[#e8e8e9]"}`}>{link}</button>
                            )
                        })}
                        <button className={`font-semibold bg-[#e8e8e9] rounded-md border px-3 py-1 ${selectedLink === links[links.length - 1].toString() ? "disabled text-[#bbb9bf]" : ""}`}>Next</button>
                    </div>
                </div>

            </div>

            {/* MODAL */}
            <Modal
                closeTimeoutMS={500}
                isOpen={modalOpen}
                preventScroll={true}
                className={"w-[50%] border border-[#7169e8] bg-white rounded-lg p-10"}
            >
                <form
                    onSubmit={isEdit ? e => saveChanges(e) : e => submitTicket(e)}
                    className="flex flex-col">
                    <div className="text-[#7169e8] mb-5 font-semibold text-lg">
                        Add Ticket Type
                    </div>
                    <div className="flex flex-col mb-5">
                        <div className="p-1">
                            <span className="text-red-500">*</span>
                            <span className="text-[#73707c] font-semibold">Ticket Type:</span>
                        </div>
                        <input
                            onChange={e => setType(e.target.value)}
                            className="text-sm flex-grow border rounded-lg px-3 py-2 focus:outline-[#7169e8]"
                            placeholder="Enter a ticket type"
                            required
                            value={type}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="p-1 text-[#73707c] font-semibold">
                            Description:
                        </div>
                        <textarea
                            onChange={e => setDescription(e.target.value)}
                            className="text-sm flex-grow border rounded-lg px-3 py-1 focus:outline-[#7169e8]"
                            placeholder="Enter description"
                            value={description}
                        />
                    </div>
                    <div className="flex ml-auto space-x-2 mt-5">
                        <button
                            type="button"
                            onClick={e => setModalOpen(false)}
                            className="px-3 py-1 transition rounded-md border bg-red-500 font-semibold text-white hover:bg-red-400">Cancel</button>
                        <button className="px-3 py-1 transition rounded-md border bg-[#7169e8] font-semibold text-white hover:bg-[#9c95ef]">{isEdit ? "Save Changes" : "Add Ticket Type"}</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default TicketsType