/* 
    Definition of each screen
    first we define the main navigator param list 
    if the screen are not defined here they dont exist in the app 
*/


import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorRoutes, ScreenRoutes } from "./Routes";
import { Category } from "../data/types/Categoty";
import { Budget } from "../data/types/Budget";
import { Income } from "../data/types/Income";
import { Expense } from "../data/types/Expense";




export type NavigatorParamList = {

    [NavigatorRoutes.HOME]: undefined

    [ScreenRoutes.HOME]: undefined

    [ScreenRoutes.INCOMES]: {
        incomes?: Income[],
        newIncomeId?: string | undefined
    }

    [ScreenRoutes.INCOME_FORM]: { income?: Income }


    [ScreenRoutes.BUDGET_EXPENSES]: {
        categoryList?: Category[],
        newExpenseId?: string | undefined,
        newBudgetId?: string | undefined
    }

    [ScreenRoutes.BUDGET_FORM]: {
        categoryList: Category[],
        budget?: Budget
    }
    [ScreenRoutes.BUDGET]: {
        budget: Budget,
        categoryList?: Category[],
        newExpenseId?: string | undefined
    }


    [ScreenRoutes.EXPENSES_FORM]: {
        categoryList: Category[],
        budget?: Budget, // if we are creating an expense from a budget
        expense?: Expense // if we are editing an expense
    }

    [ScreenRoutes.EXPENSE]: {
        newExpenseId?: string | undefined
        expenseList?: Expense[],
    }


}


// ------------------ navigator props ------------------ //
export type HomeNavigatorProps = NativeStackScreenProps<
    NavigatorParamList,
    NavigatorRoutes.HOME
>


// ------------------ props screens ------------------ //

// home screen props (main screen)
export type HomeScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.HOME
>

// incomes screen
export type IncomesScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.INCOMES
>

// incomes create screen
export type IncomesCreateScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.INCOME_FORM
>

// BUDGET EXPENSE screen
export type BudgetsExpensesScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.BUDGET_EXPENSES
>

// EXPENSE screen
export type ExpenseScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.EXPENSE
>

// EXPENSE create screen
export type ExpensesCreateScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.EXPENSES_FORM
>

// BUDGET screen
export type BudgetsScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.BUDGET
>

// BUDGET CREATE screen
export type BudgetsCreateScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.BUDGET_FORM
>