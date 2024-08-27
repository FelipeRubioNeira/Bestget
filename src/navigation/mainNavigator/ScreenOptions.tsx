/*
    This file contains the options for the screens in the main navigator.
*/

import { Colors } from "../../ui/constants/Colors";
import { FontFamily } from "../../ui/constants/Fonts";


const ScreenOptions = Object.freeze({

    login: {
        headerShown: false,
        title: "Login",
    },

    chooseFinances: {
        headerShown: false,
        title: "Elegir finanzas",
    },

    groups: {
        headerShown: true,
        title: "Grupos",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.CHIP_LUXURIES },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    },

    groupForm: {
        headerShown: true,
        title: "Crear grupo",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.CHIP_LUXURIES },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    },

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

    EXPENSE: {
        title: "Gastos",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.YELLOW },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    },

    EXPENSES_FORM: {
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

    BUDGET_FORM: {
        title: "Nuevo presupuesto",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.YELLOW },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    },

    STATISTICS: {
        title: "Estadísticas",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.PURPLE },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    },

    PROFILE: {
        title: "Perfil",
        headerTintColor: Colors.BLACK,
        headerStyle: { backgroundColor: Colors.RED },
        headerTitleStyle: { fontFamily: FontFamily.BOLD },
    },

})

export default ScreenOptions;