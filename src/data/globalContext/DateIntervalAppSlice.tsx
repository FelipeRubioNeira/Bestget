import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateInterval } from "../types/DateInterval";
import DateTime from "../../utils/DateTime";
import { RootState } from "./store";

const dateTime = new DateTime()

const initialState: DateInterval = {
    initialDate: dateTime.date,
    finalDate: dateTime.getNextMonth(dateTime.date) 
}

export const dateIntervalAppSlice = createSlice({
    name: "dateIntervalApp",
    initialState,
    reducers: {
        updateDateInterval: (state, action: PayloadAction<DateInterval>) => {
            const { initialDate, finalDate } = action.payload
            state.initialDate = initialDate
            state.finalDate = finalDate
        }
    }
})

export const selectDateIntervalApp = (state: RootState) => state.dateInterval

export default dateIntervalAppSlice.reducer
export const { updateDateInterval } = dateIntervalAppSlice.actions