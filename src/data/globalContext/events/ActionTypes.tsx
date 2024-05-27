import { Budget } from "../../types/Budget";
import { Category } from "../../types/Categoty";
import { DateInterval } from "../../types/DateInterval";
import { Expense } from "../../types/Expense";
import { Income } from "../../types/Income";
import UserApp from "../../types/UserApp";


// ----------------- Actions ----------------- //
enum Actions {
    UPDATE_USER_APP = 'UPDATE_USER_APP',
    UPDATE_DATE_INTERVAL = 'UPDATE_DATE_INTERVAL',
    UPDATE_INCOMES = 'UPDATE_INCOMES',
    UPDATE_EXPENSES = 'UPDATE_EXPENSES',
    UPDATE_BUDGETS = 'UPDATE_BUDGETS',
    UPDATE_CATEGORIES = 'UPDATE_CATEGORIES',
    UPDATE_COPIED_MONTH = 'UPDATE_COPIED_MONTH'
}


// -----------------  types ----------------- //
type UpdateUserAppAction = {
    type: Actions.UPDATE_USER_APP;
    payload: UserApp;
}

type UpdateDateIntervalContextAction = {
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

type UpdateCopiedMonthAction = {
    type: Actions.UPDATE_COPIED_MONTH;
    payload: DateInterval;
}



// ----------------- Action Type ----------------- //
type ActionType = UpdateUserAppAction| UpdateDateIntervalContextAction
    | UpdateIncomesAction | UpdateExpensesAction
    | UpdateBudgetsAction | UpdateCategoriesAction
    | UpdateCopiedMonthAction 



// ----------------- export  ----------------- //
export type {
    ActionType
}

export {
    Actions
}
