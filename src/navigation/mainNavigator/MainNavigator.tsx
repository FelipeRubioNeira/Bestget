import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { NavigatorParamList } from '../NavigationParamList'

import {
    HomeScreen,
    IncomesScreen,
} from '../../ui/screens/Index'

import { ScreenRoutes } from '../Routes';
import ScreenOptions from './ScreenOptions';
import IncomeFormScreen from '../../ui/screens/incomeForm/IncomeFormScreen';
import ExpenseForm from '../../ui/screens/expensesForm/ExpenseFormScreen';
import BudgetsFormScreen from '../../ui/screens/budgetsForm/BudgetsFormScreen';
import BudgetScreen from '../../ui/screens/budget/BudgetScreen';
import BudgetsExpensesScreen from '../../ui/screens/budgetsExpenses/BudgetsExpensesScreen';
import LoginScreen from '../../ui/screens/login/LoginScreen';
import StatisticsScreen from '../../ui/screens/statistics/StatisticsScreen';
import ProfileScreen from '../../ui/screens/profile/ProfileScreen';




const Stack = createNativeStackNavigator<NavigatorParamList>()



const MainNavigator = () => {


    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName={ScreenRoutes.LOGIN}>

                <Stack.Screen
                    component={LoginScreen}
                    name={ScreenRoutes.LOGIN}
                    options={ScreenOptions.login}
                />

                <Stack.Screen
                    component={HomeScreen}
                    name={ScreenRoutes.HOME}
                    options={ScreenOptions.home}
                />

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

                <Stack.Screen
                    component={BudgetsExpensesScreen}
                    name={ScreenRoutes.BUDGET_EXPENSES}
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

                <Stack.Screen
                    component={StatisticsScreen}
                    name={ScreenRoutes.STATISTICS}
                    options={ScreenOptions.STATISTICS}
                />

                <Stack.Screen
                    component={ProfileScreen}
                    name={ScreenRoutes.PROFILE}
                    options={ScreenOptions.PROFILE}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;

