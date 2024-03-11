import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorRoutes, ScreenRoutes } from "./Routes";
import { Category } from "../../data/types/Categoty";



/* 
    Definition of each screen
    first we define the main navigator param list 
    if the screen are not defined here they dont exist in the app 
*/
export type NavigatorParamList = {

    [NavigatorRoutes.HOME]: undefined

    [ScreenRoutes.HOME]: undefined

    [ScreenRoutes.EXPENSES]: {newExpenseId?: string | undefined}
    [ScreenRoutes.EXPENSES_CREATE]: { categoryList: Category[] | undefined }

    [ScreenRoutes.INCOMES]: { newIncomeId?: string | undefined }
    [ScreenRoutes.INCOMES_CREATE]: undefined

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