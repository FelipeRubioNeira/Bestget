import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import UserApp from "../types/UserApp";
import { RootState } from "./Store";


// Define the initial state using that type
const initialState: UserApp = {
    userId: "",
    name: "",
    email: "",
    photo: ""
}

export const userAppSlice = createSlice({
    name: "userApp",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<UserApp>) => {
            const { userId, name, email, photo } = action.payload
            state.userId = userId
            state.name = name
            state.email = email
            state.photo = photo
        },
        removeUser: (state) => {
            state.userId = ""
            state.name = ""
            state.email = ""
            state.photo = ""
        }
    }
})

// export the slice of the state
export const selectUserApp = (state: RootState) => state.userApp;

// Export the reducer, actions and selectors
export const {
    updateUser,
    removeUser
} = userAppSlice.actions

export default userAppSlice.reducer


