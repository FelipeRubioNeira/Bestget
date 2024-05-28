import { configureStore } from "@reduxjs/toolkit";
import {userAppSlice} from "./UserAppSlice";
import {financesAppSlice} from "./FinancesAppSlice";
import { dateIntervalAppSlice } from "./DateIntervalAppSlice";

/**
 * Store
 * 
 * we define the store with the reducers
 * RootState: the type of the store
 * 
 * AppDispatch: the type of the dispatch
 */
const store = configureStore({
    reducer: {
        userApp: userAppSlice.reducer,
        financesApp: financesAppSlice.reducer,
        dateInterval:dateIntervalAppSlice.reducer
        // ... add more reducers here
    },

})


type RootState = ReturnType<typeof store.getState> // type of the store
type AppDispatch = typeof store.dispatch // type of the dispatch

export {
    store,
}

export type {
    RootState,
    AppDispatch
}


