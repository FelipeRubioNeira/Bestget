import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorRoutes, ScreenRoutes } from "./Routes";
import { Category } from "../../data/types/Categoty";
import { Budget } from "../../data/types/Budget";



/* 
    Definition of each screen
    first we define the main navigator param list 
    if the screen are not defined here they dont exist in the app 
*/
export type NavigatorParamList = {

    [NavigatorRoutes.HOME]: undefined

    [ScreenRoutes.HOME]: undefined

    [ScreenRoutes.INCOMES]: { newIncomeId?: string | undefined }
    [ScreenRoutes.INCOMES_CREATE]: undefined

    [ScreenRoutes.BUDGET_EXPENSES]: undefined

    [ScreenRoutes.EXPENSES]: { newExpenseId?: string | undefined }
    [ScreenRoutes.EXPENSES_CREATE]: { categoryList: Category[] | undefined }

    [ScreenRoutes.BUDGET]: { budget: Budget, categoryList: Category[] }
    [ScreenRoutes.BUDGETS_CREATE]: { categoryList: Category[] | undefined }

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
    ScreenRoutes.INCOMES_CREATE
>

// BUDGET EXPENSES screen
export type BudgetsExpensesScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.BUDGET_EXPENSES
>

// EXPENSES screen
export type ExpensesScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.EXPENSES
>

// EXPENSES create screen
export type ExpensesCreateScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.EXPENSES_CREATE
>

// BUDGET screen
export type BudgetsScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.BUDGET
>

// BUDGET CREATE screen
export type BudgetsCreateScreenProps = NativeStackScreenProps<
    NavigatorParamList,
    ScreenRoutes.BUDGETS_CREATE
>