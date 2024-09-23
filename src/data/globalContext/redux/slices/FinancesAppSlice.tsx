import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Income } from "../../../types/Income";
import { Expense } from "../../../types/Expense";
import { Budget } from "../../../types/Budget";
import { Category } from "../../../types/Categoty";
import { RootState } from "../Store";


type FinancesState = {

    // groupId
    groupId: string,
    //incomes
    incomes: Income[],
    // expenses
    expenses: Expense[],
    // budgets
    budgets: Budget[],
    // categories
    categories: Category[],
}


const initialState: FinancesState = {
    groupId: "",
    incomes: [],
    expenses: [],
    budgets: [],
    categories: []
}


export const financesAppSlice = createSlice({
    name: "financesApp",
    initialState,
    reducers: {
        updateGroupId: (state, action: PayloadAction<string>) => {
            state.groupId = action.payload
        },
        deleteGroupId: (state) => {
            state.groupId = ""
        },
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
    updateGroupId,
    deleteGroupId,
    updateIncomes,
    updateExpenses,
    updateBudgets,
    updateCategories,
} = financesAppSlice.actions

export default financesAppSlice.reducer