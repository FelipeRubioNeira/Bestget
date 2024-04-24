import { Budget } from "../types/Budget";
import { Category } from "../types/Categoty";
import { DateInterval } from "../types/DateInterval";
import { Expense } from "../types/Expense";
import { Income } from "../types/Income";


// ----------------- Actions ----------------- //
enum Actions {
    UPDATE_DATE_INTERVAL = 'UPDATE_DATE_INTERVAL',
    UPDATE_INCOMES = 'UPDATE_INCOMES',
    UPDATE_EXPENSES = 'UPDATE_EXPENSES',
    UPDATE_BUDGETS = 'UPDATE_BUDGETS',
    UPDATE_CATEGORIES = 'UPDATE_CATEGORIES',
}


// -----------------  types ----------------- //
type updateDateIntervalContextAction = {
    type: Actions.UPDATE_DATE_INTERVAL;
    payload: DateInterval;
};

type UpdateIncomesAction = {
    type: Actions.UPDATE_INCOMES;
    payload: Income[];
}

type UpdateExpensesAction = {
    type: Actions.UPDATE_EXPENSES;
    payload: Expense[];
}

type UpdateBudgetsAction = {
    type: Actions.UPDATE_BUDGETS;
    payload: Budget[];
}

type UpdateCategoriesAction = {
    type: Actions.UPDATE_CATEGORIES;
    payload: Category[];
}



// ----------------- Action Type ----------------- //
type ActionType = updateDateIntervalContextAction | UpdateIncomesAction |
    UpdateExpensesAction | UpdateBudgetsAction | UpdateCategoriesAction;



// ----------------- export  ----------------- //
export type {
    ActionType
}

export {
    Actions
}
