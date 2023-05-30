export const handlePagination = (id, setStart, setEnd, setSelectedLink, totalTypes, limit) => {
    const link = id
    setStart((link - 1) * limit + 1)
    const endTicket = (link * limit)

    if (endTicket > totalTypes) {
        setEnd(totalTypes)
    } else {
        setEnd(endTicket)
    }
    setSelectedLink(link)
}

export const handleButtonRef = (buttonIndex, ref, buttonRefs) => {
    buttonRefs.current[buttonIndex] = ref;
};

export const handleEdit = (e, ticketsType, setType, setId, setDescription, setIsEdit, setModalOpen) => {
    const ticket = ticketsType.find(ticket => ticket.id === e.target.id)

    if (ticket) {
        setType(ticket.type)
        setId(ticket.id)
        setDescription(ticket.description)

        setIsEdit(true)
        setModalOpen(true)
    }
}

export const calculateLinks = (selected, totalTypes, limit, setLinks, setEnd) => {
    if (totalTypes > limit) {
        let range = 0
        range = totalTypes / limit
        let l = []
        for (let index = 0; index < range; index++) {
            l.push(index + 1)
        }
        setLinks(l)
        if (selected !== "1" && selected * limit <= totalTypes) {
            setEnd(selected * limit)
        } else if (selected !== "1") {
            setEnd(totalTypes)
        }
        else {
            setEnd(limit)
        }
    }
    else {
        setEnd(totalTypes)
        setLinks([1])
    }
}

export const addTicket = (setIsEdit, setId, setType, setDescription, setModalOpen) => {
    setIsEdit(false)

    setId("")
    setType("")
    setDescription("")

    setModalOpen(true)
}