
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { NavigatorParamList } from '../NavigationParamList'

import {
    HomeScreen,
    IncomesScreen,
    MovementsScreen
} from '../../screens/Index'

import ScreenOptions from './ScreenOptions';
import IncomesCreateScreen from '../../screens/incomesCreate/IncomesCreateScreen';
import { ScreenRoutes } from '../Routes';




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


                {/* movements screen */}
                <Stack.Screen
                    component={MovementsScreen}
                    name={ScreenRoutes.MOVEMENTS}
                    options={ScreenOptions.movements}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;

