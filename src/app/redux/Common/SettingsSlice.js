const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
    settings: {
        theme_light: "bg-[#ffffff]",
        theme_dark: "bg-[#2e3348]",
        theme_light_primary: "bg-[#7169e8]",
        theme_dark_primary: "bg-[#9c95ef]",
        theme_light_secondary: "bg-[#9c95ef]",
        theme_dark_secondary: "bg-[#7169e8]"
    },
    selected: {
        theme: "bg-[#ffffff]",
        primary: "bg-[#7169e8]",
        secondary: "bg-[#9c95ef]"
    },
    mobile: false
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setMobile: (state, action) => {
            state.mobile = action.payload
        }
    }
})

export const { setMobile } = settingsSlice.actions
export default settingsSlice.reducer