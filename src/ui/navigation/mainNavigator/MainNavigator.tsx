
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { NavigatorParamList } from '../NavigationParamList'

import {
    HomeScreen,
    IncomesScreen,
    ExpensesScreen
} from '../../screens/Index'

import ScreenOptions from './ScreenOptions';
import IncomesCreateScreen from '../../screens/incomesCreate/IncomesCreateScreen';
import { ScreenRoutes } from '../Routes';
import ExpensesCreate from '../../screens/expensesCreate/ExpensesCreateScreen';
import BudgetsCreateScreen from '../../screens/budgetsCreate/BudgetsCreateScreen';
import BudgetsScreen from '../../screens/budgets/BudgetsScreen';
import BudgetsExpensesScreen from '../../screens/budgetsExpenses/BudgetsExpensesScreen';




const Stack = createNativeStackNavigator<NavigatorParamList>()



const MainNavigator = () => {


    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName={ScreenRoutes.HOME}>

                {/* home screen */}
                <Stack.Screen
                    component={HomeScreen}
                    name={ScreenRoutes.HOME}
                    options={ScreenOptions.home}
                />

                {/* incomes screens */}
                <Stack.Screen
                    component={IncomesScreen}
                    name={ScreenRoutes.INCOMES}
                    options={ScreenOptions.incomes}
                />

                <Stack.Screen
                    component={IncomesCreateScreen}
                    name={ScreenRoutes.INCOMES_CREATE}
                    options={ScreenOptions.incomesCreate}
                />


                {/* BUDGETS EXPENSES screen */}
                <Stack.Screen
                    component={BudgetsExpensesScreen}
                    name={ScreenRoutes.BUDGET_EXPENSES}
                    options={ScreenOptions.EXPENSES}
                />


                {/* EXPENSES screen */}
                <Stack.Screen
                    component={ExpensesScreen}
                    name={ScreenRoutes.EXPENSES}
                    options={ScreenOptions.EXPENSES}
                />

                <Stack.Screen
                    component={ExpensesCreate}
                    name={ScreenRoutes.EXPENSES_CREATE}
                    options={ScreenOptions.EXPENSES_CREATE}
                />

                <Stack.Screen
                    component={BudgetsScreen}
                    name={ScreenRoutes.BUDGETS}
                    options={ScreenOptions.BUDGETS_CREATE}
                />


                <Stack.Screen
                    component={BudgetsCreateScreen}
                    name={ScreenRoutes.BUDGETS_CREATE}
                    options={ScreenOptions.BUDGETS_CREATE}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;

