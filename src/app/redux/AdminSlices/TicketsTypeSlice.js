const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
    ticketsType: [{
        id: "0001",
        type: "Internet Issue",
        description: "Internet not connecting or slow"
    }],
    totalTypes: 1,
    idCount: 1,
}

const ticketsTypeSlice = createSlice({
    name: 'ticketTypes',
    initialState,
    reducers: {
        add: (state, action) => {
            state.ticketsType.push({
                ...action.payload,
                id: String(state.idCount + 1).padStart(4, '0')
            })
            state.totalTypes++
            state.idCount++
        },
        update: (state, action) => {
            const { id, type, description } = action.payload
            const ticket = state.ticketsType.find(ticket => ticket.id === id)
            if (ticket) {
                ticket.type = type
                ticket.description = description
            }
        },
        deleteTicketType: (state, action) => {
            const { id } = action.payload
            const updatedList = state.ticketsType.filter(ticket => ticket.id !== id)
            state.ticketsType = updatedList
            state.totalTypes = updatedList.length
        },
    }
})

export const { add, update, deleteTicketType } = ticketsTypeSlice.actions
export default ticketsTypeSlice.reducer