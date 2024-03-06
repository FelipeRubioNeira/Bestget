import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreensRoutes } from "./Routes";



/* 
    Definition of each screen
    first we define the main navigator param list 
    if the screen are not defined here they dont exist in the app 
*/
export type MainNavigatorParamList = {
    [ScreensRoutes.HOME]: undefined
    [ScreensRoutes.MOVEMENTS]: undefined
    [ScreensRoutes.INCOMES]: { newIncomeId?: string}
    [ScreensRoutes.INCOMES_CREATE]: undefined
}


// ------------------ props screens ------------------ //

// home screen props (main screen)
export type HomeScreenProps = NativeStackScreenProps<
    MainNavigatorParamList,
    ScreensRoutes.HOME
>

// incomes screen
export type IncomesScreenProps = NativeStackScreenProps<
    MainNavigatorParamList,
    ScreensRoutes.INCOMES
>

// incomes create screen
export type IncomesCreateScreenProps = NativeStackScreenProps<
    MainNavigatorParamList,
    ScreensRoutes.INCOMES_CREATE
>

// movements screen
export type MovementsScreenProps = NativeStackScreenProps<
    MainNavigatorParamList,
    ScreensRoutes.MOVEMENTS
>