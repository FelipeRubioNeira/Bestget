/* 
    Definition of each screen
    first we define the main navigator param list 
    if the screen are not defined here they dont exist in the app 
*/


import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorRoutes, ScreenRoutes } from "./Routes";
import { Budget } from "../data/types/Budget";
import { Income } from "../data/types/Income";
import { Expense } from "../data/types/Expense";



export type NavigatorParamList = {

    [NavigatorRoutes.HOME]: undefined

    [ScreenRoutes.LOGIN]: undefined

    [ScreenRoutes.HOME]: undefined

    [ScreenRoutes.INCOMES]: {
        incomeId?: string,
    }

    [ScreenRoutes.INCOME_FORM]: {
        income?: Income,
    }

    [ScreenRoutes.BUDGET_EXPENSES]: {
        newExpenseId?: string,
        newBudgetId?: string,
    }

    [ScreenRoutes.BUDGET_FORM]: {
        budget?: Budget,
    }

    [ScreenRoutes.BUDGET]: {
        budget: Budget,
        newExpenseId?: string,
    }

    [ScreenRoutes.EXPENSES_FORM]: {
        budget?: Budget, // if we are creating an expense from a budget
        expense?: Expense, // if we are editing an expense
    }

    [ScreenRoutes.EXPENSE]: {
        newExpenseId?: string
        expenseList?: Expense[],
    }

    [ScreenRoutes.STATISTICS]: undefined

}


// ------------------ navigator props ------------------ //
export type HomeNavigatorProps = NativeStackScreenProps<
    NavigatorParamList,
    NavigatorRoutes.HOME
>


// ------------------ props screens ------------------ //

// login screen props
export type LoginScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.LOGIN
>

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

// STATISTICS screen
export type StatisticsScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.STATISTICS
>
