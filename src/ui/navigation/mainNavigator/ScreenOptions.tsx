/*
    This file contains the options for the screens in the main navigator.
*/

import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";


const ScreenOptions = Object.freeze({

    home: {
        headerShown: false,
        title: "Inicio",
    },

    incomes: {
        title: "Ingresos",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.GREEN },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    },

    incomesCreate: {
        title: "Nuevo Ingreso",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.GREEN },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    },
    
    movements: {
        title: "Movimientos",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.YELLOW },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    }
})

export default ScreenOptions;