import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { NavigatorParamList } from '../NavigationParamList'

import {
    HomeScreen,
    IncomesScreen,
    ExpenseScreen
} from '../../ui/screens/Index'

import { ScreenRoutes } from '../Routes';
import ScreenOptions from './ScreenOptions';
import IncomeFormScreen from '../../ui/screens/incomeForm/IncomeFormScreen';
import ExpenseForm from '../../ui/screens/expensesForm/ExpenseFormScreen';
import BudgetsFormScreen from '../../ui/screens/budgetsForm/BudgetsFormScreen';
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
                    component={IncomeFormScreen}
                    name={ScreenRoutes.INCOME_FORM}
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
                    component={ExpenseForm}
                    name={ScreenRoutes.EXPENSES_FORM}
                    options={ScreenOptions.EXPENSES_FORM}
                />

                <Stack.Screen
                    component={BudgetScreen}
                    name={ScreenRoutes.BUDGET}
                    options={ScreenOptions.BUDGET_FORM}
                />


                <Stack.Screen
                    component={BudgetsFormScreen}
                    name={ScreenRoutes.BUDGET_FORM}
                    options={ScreenOptions.BUDGET_FORM}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;

