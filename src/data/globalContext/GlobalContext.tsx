import React, { ReactNode } from "react";
import { createContext, useContext, useReducer } from "react";
import globalReducer from "./GlobalReducer";
import { DateInterval } from "../types/DateInterval";
import DateTime from "../../utils/DateTime";
import { Actions } from "./events/ActionTypes";
import { Income } from "../types/Income";
import { Expense } from "../types/Expense";
import { Budget } from "../types/Budget";
import { Category } from "../types/Categoty";
import UserApp from "../types/User";


const dateTime = new DateTime()


// 1- Create a context
export type GlobalContextType = {

    userApp: UserApp,
    updateUserApp: (userApp: UserApp) => void,

    //current date interval
    dateInterval: DateInterval,
    updateDateIntervalContext: (dateInterval: DateInterval) => void,

    //imcomes
    incomesContext: Income[],
    updateIncomesContext: (incomes: Income[]) => void,

    // expenses
    expensesContext: Expense[],
    updateExpensesContext: (expenses: Expense[]) => void,

    // budgets
    budgetsContext: Budget[],
    updateBudgetsContext: (budgets: Budget[]) => void,

    categoriesContext: Category[],
    updateCategoriesContext: (categories: Category[]) => void,

}


// 1.1- Default values
const DefaultGlobalContext: GlobalContextType = {

    userApp: {
        email: "",
        userId: "",
        name: "",
        photo: ""
    },

    updateUserApp: () => { },

    //date interval
    dateInterval: {
        initialDate: dateTime.date, // current date
        finalDate: dateTime.getNextMonth(dateTime.date) // next month
    },

    updateDateIntervalContext: () => { },

    //incomes
    incomesContext: [],
    updateIncomesContext: () => { },

    //expenses
    expensesContext: [],
    updateExpensesContext: () => { },

    //budgets
    budgetsContext: [],
    updateBudgetsContext: () => { },

    // categories
    categoriesContext: [],
    updateCategoriesContext: () => { },

}

const GlobalContext = createContext(DefaultGlobalContext)


// 2- Create a provider
export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {


    // ----------------- Reducer ----------------- //
    const [state, dispatch] = useReducer(globalReducer, DefaultGlobalContext)



    // ----------------- Actions ----------------- //
    const updateUserApp = (userApp: UserApp) => {
        dispatch({ type: Actions.UPDATE_USER_APP, payload: userApp })
    }

    const updateDateIntervalContext = (dateInterval: DateInterval) => {
        dispatch({ type: Actions.UPDATE_DATE_INTERVAL, payload: dateInterval })
    }

    const updateIncomesContext = (incomes: Income[]) => {
        dispatch({ type: Actions.UPDATE_INCOMES, payload: incomes })
    }

    const updateExpensesContext = (expenses: Expense[]) => {
        dispatch({ type: Actions.UPDATE_EXPENSES, payload: expenses })
    }

    const updateBudgetsContext = (budgets: Budget[]) => {
        dispatch({ type: Actions.UPDATE_BUDGETS, payload: budgets })
    }

    const updateCategoriesContext = (categories: Category[]) => {
        dispatch({ type: Actions.UPDATE_CATEGORIES, payload: categories })
    }


    // ----------------- Render ----------------- //
    return (
        <GlobalContext.Provider
            value={{


                userApp: state.userApp,
                updateUserApp,

                //date interval
                dateInterval: state.dateInterval,
                updateDateIntervalContext,

                //incomes
                incomesContext: state.incomesContext,
                updateIncomesContext,

                //expenses
                expensesContext: state.expensesContext,
                updateExpensesContext,

                //budgets
                budgetsContext: state.budgetsContext,
                updateBudgetsContext,

                //categories
                categoriesContext: state.categoriesContext,
                updateCategoriesContext,

            }}>
            {children}
        </GlobalContext.Provider>

    )
}

// 3- Create a hook
export const useGlobalContext = () => useContext(GlobalContext)
