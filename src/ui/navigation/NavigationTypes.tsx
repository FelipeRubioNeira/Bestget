import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreensRoutes } from "./Routes";


/* 
    Definition of each screen
    first we define the main navigator param list 
    if the screen are not defined here they dont exist in the app 
*/
export type MainNavigatorParamList = {
    [ScreensRoutes.HOME]: undefined
    [ScreensRoutes.INCOMES]: undefined
    [ScreensRoutes.MOVEMENTS]: undefined
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

// movements screen
export type MovementsScreenProps = NativeStackScreenProps<
    MainNavigatorParamList,
    ScreensRoutes.MOVEMENTS
>