import { createSlice } from "@reduxjs/toolkit"

const hourSlice = createSlice({
    name: 'hour',
    initialState: [],
    reducers: {
        setHours(state, action) {
            return action.payload;
        },
        addHour(state, action) {
            const hour = action.payload
            state.push(hour)
        },
    }
})

export const {setHours, addHour} = hourSlice.actions
export default hourSlice.reducer;