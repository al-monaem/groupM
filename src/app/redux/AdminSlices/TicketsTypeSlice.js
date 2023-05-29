const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
    ticketsType: [{
        id: "0001",
        type: "Internet Issue",
        description: "Internet not connecting or slow"
    }],
    totalTypes: 1,
}

const ticketsTypeSlice = createSlice({
    name: 'ticketTypes',
    initialState,
    reducers: {
        add: (state, action) => {
            state.ticketsType.push({
                ...action.payload,
                id: String(state.totalTypes + 1).padStart(4, '0')
            })
            state.totalTypes++
        },
        update: (state, action) => {
            const { id, type, description } = action.payload
            const ticket = state.ticketsType.find(ticket => ticket.id === id)
            if (ticket) {
                ticket.type = type
                ticket.description = description
            }
        }
    }
})

export const { add, update } = ticketsTypeSlice.actions
export default ticketsTypeSlice.reducer