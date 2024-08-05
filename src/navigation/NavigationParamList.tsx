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


// Params that each screen must receive
type NavigatorParamList = {

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

    [ScreenRoutes.PROFILE]: undefined

}



// ------------------ props screens ------------------ //

// home navigator props
type HomeNavigatorProps = NativeStackScreenProps<
    NavigatorParamList,
    NavigatorRoutes.HOME
>


// login screen props
type LoginScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.LOGIN
>

// home screen props (main screen)
type HomeScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.HOME
>

// incomes screen
type IncomesScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.INCOMES
>

// incomes create screen
type IncomesCreateScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.INCOME_FORM
>

// BUDGET EXPENSE screen
type BudgetsExpensesScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.BUDGET_EXPENSES
>

// EXPENSE screen
type ExpenseScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.EXPENSE
>

// EXPENSE create screen
type ExpensesCreateScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.EXPENSES_FORM
>

// BUDGET screen
type BudgetsScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.BUDGET
>

// BUDGET CREATE screen
type BudgetsCreateScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.BUDGET_FORM
>

// STATISTICS screen
type StatisticsScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.STATISTICS
>

// PROFILE screen
type ProfileScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.PROFILE
>

// export all types
export type {
    NavigatorParamList,
    HomeNavigatorProps,
    LoginScreenProps,
    HomeScreenProps,
    IncomesScreenProps,
    IncomesCreateScreenProps,
    BudgetsExpensesScreenProps,
    ExpenseScreenProps,
    ExpensesCreateScreenProps,
    BudgetsScreenProps,
    BudgetsCreateScreenProps,
    StatisticsScreenProps,
    ProfileScreenProps,
}
