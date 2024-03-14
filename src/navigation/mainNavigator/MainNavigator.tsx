
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { NavigatorParamList } from '../NavigationParamList'

import {
    HomeScreen,
    IncomesScreen,
    ExpenseScreen
} from '../../ui/screens/Index'

import ScreenOptions from './ScreenOptions';
import IncomesCreateScreen from '../../ui/screens/incomesCreate/IncomesCreateScreen';
import { ScreenRoutes } from '../Routes';
import ExpensesCreate from '../../ui/screens/expensesCreate/ExpensesCreateScreen';
import BudgetsCreateScreen from '../../ui/screens/budgetsCreate/BudgetsCreateScreen';
import BudgetScreen from '../../ui/screens/budget/BudgetScreen';
import BudgetsExpensesScreen from '../../ui/screens/budgetsExpenses/BudgetsExpensesScreen';




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


                {/* BUDGET EXPENSE screen */}
                <Stack.Screen
                    component={BudgetsExpensesScreen}
                    name={ScreenRoutes.BUDGET_EXPENSES}
                    options={ScreenOptions.EXPENSE}
                />


                {/* EXPENSE screen */}
                <Stack.Screen
                    component={ExpenseScreen}
                    name={ScreenRoutes.EXPENSE}
                    options={ScreenOptions.EXPENSE}
                />

                <Stack.Screen
                    component={ExpensesCreate}
                    name={ScreenRoutes.EXPENSES_CREATE}
                    options={ScreenOptions.EXPENSES_CREATE}
                />

                <Stack.Screen
                    component={BudgetScreen}
                    name={ScreenRoutes.BUDGET}
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

