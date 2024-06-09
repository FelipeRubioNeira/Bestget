import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Income } from "../../types/Income";
import { Expense } from "../../types/Expense";
import { Budget } from "../../types/Budget";
import { Category } from "../../types/Categoty";
import { RootState } from "../redux/Store";

type FinancesState = {
    //imcomes
    incomes: Income[],
    // expenses
    expenses: Expense[],
    // budgets
    budgets: Budget[],
    // categories
    categories: Category[],
}


const initialState: FinancesState = {
    incomes: [],
    expenses: [],
    budgets: [],
    categories: []
}


export const financesAppSlice = createSlice({
    name: "financesApp",
    initialState,
    reducers: {
        updateIncomes: (state, action: PayloadAction<Income[]>) => {
            state.incomes = action.payload
        },
        updateExpenses: (state, action: PayloadAction<Expense[]>) => {
            state.expenses = action.payload
        },
        updateBudgets: (state, action: PayloadAction<Budget[]>) => {
            state.budgets = action.payload
        },
        updateCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload
        }
    }
})

export const selectFinancesApp = (state: RootState) => state.financesApp;

// export the slice of the state
export const {
    updateIncomes,
    updateExpenses,
    updateBudgets,
    updateCategories
} = financesAppSlice.actions

export default financesAppSlice.reducer