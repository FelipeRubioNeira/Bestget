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
        title: "Nuevo ingreso",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.GREEN },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    },

    BUDGET_EXPENSES: {
        title: "Gastos y presupuestos",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.YELLOW },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    },

    EXPENSES: {
        title: "Gastos",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.YELLOW },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    },

    EXPENSES_CREATE: {
        title: "Nuevo gasto",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.YELLOW },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    },

    BUDGET: {
        title: "Presupuesto",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.YELLOW },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    },

    BUDGETS_CREATE: {
        title: "Nuevo presupuesto",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.YELLOW },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    }
})

export default ScreenOptions;