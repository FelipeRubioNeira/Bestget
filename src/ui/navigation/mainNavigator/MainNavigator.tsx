
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { MainNavigatorParamList } from '../NavigationTypes'

import {
    HomeScreen,
    IncomesScreen,
    MovementsScreen
} from '../../screens/Index'


import ScreenOptions from './ScreenOptions';
import { ScreensRoutes } from '../Index';



const Stack = createNativeStackNavigator<MainNavigatorParamList>()


const MainNavigator = () => {

    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={ScreensRoutes.HOME}
            >
                <Stack.Screen
                    component={HomeScreen}
                    name={ScreensRoutes.HOME}
                    options={ScreenOptions.home}
                />

                <Stack.Screen
                    component={IncomesScreen}
                    name={ScreensRoutes.INCOMES}
                    options={ScreenOptions.incomes}
                />

                <Stack.Screen
                    component={MovementsScreen}
                    name={ScreensRoutes.MOVEMENTS}
                    options={ScreenOptions.movements}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;

