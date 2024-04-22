import React, { useEffect } from "react";
import { createContext, useContext, useReducer } from "react";
import globalReducer from "./GlobalReducer";
import { DateInterval } from "../types/DateInterval";
import DateTime from "../../utils/DateTime";
import { Actions } from "./ActionTypes";
import { EventEmitter } from 'eventemitter3';
import { EventNames } from "./EventTypes";
import { Income } from "../types/Income";


const dateTime = new DateTime()


// 1- Create a context
export type GlobalContextType = {
    dateInterval: DateInterval,
    updateDateIntervalContext: (dateInterval: DateInterval) => void,

    incomesContext: Income[],
    updateIncomesContext: (incomes: Income[]) => void,

    eventEmitter: EventEmitter,
    emitIncomeEvent: () => void,
    addIncomeListener: (callback: () => void) =>()=> void,
    

}


// 1.1- Default values
const DefaultGlobalContext: GlobalContextType = {

    dateInterval: {
        initialDate: dateTime.date, // current date
        finalDate: dateTime.getNextMonth(dateTime.date) // next month
    },
    updateDateIntervalContext: () => { },

    incomesContext: [],
    updateIncomesContext: () => { },

    eventEmitter: new EventEmitter(),
    emitIncomeEvent: () => { },
    addIncomeListener: () => () => { }
}

const GlobalContext = createContext(DefaultGlobalContext)


// 2- Create a provider
export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {


    // ----------------- Reducer ----------------- //
    const [state, dispatch] = useReducer(globalReducer, DefaultGlobalContext)


    // ----------------- Effects ----------------- //
    useEffect(() => {
        return () => {
            state.eventEmitter.removeAllListeners()
        }
    }, [state.eventEmitter]);


    // ----------------- Actions ----------------- //
    const updateDateIntervalContext = (dateInterval: DateInterval) => {
        dispatch({ type: Actions.UPDATE_DATE_INTERVAL, payload: dateInterval })
    }

    const updateIncomesContext = (incomes: Income[]) => {
        dispatch({ type: Actions.UPDATE_INCOMES, payload: incomes })
    }


    // ----------------- Emitters ----------------- //
    const emitIncomeEvent = () => {
        state.eventEmitter.emit(EventNames.INCOME_EVENT)
    }

    const addIncomeListener = (callback: () => void) => {
        state.eventEmitter.addListener(EventNames.INCOME_EVENT, callback);
        return () => state.eventEmitter.removeListener(EventNames.INCOME_EVENT, callback);
    }






    // ----------------- Render ----------------- //
    return (
        <GlobalContext.Provider
            value={{
                dateInterval: state.dateInterval,
                updateDateIntervalContext,

                incomesContext: state.incomesContext,
                updateIncomesContext,

                eventEmitter: state.eventEmitter,
                emitIncomeEvent,
                addIncomeListener

            }}>
            {children}
        </GlobalContext.Provider>

    )
}

// 3- Create a hook
export const useGlobalContext = () => useContext(GlobalContext)
