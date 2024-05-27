import { GlobalContextType } from "./GlobalContext"
import { ActionType, Actions } from "./events/ActionTypes"


const globalReducer = (
    state: GlobalContextType,
    { type, payload }: ActionType
) => {

    switch (type) {

        case Actions.UPDATE_USER_APP:
            return { ...state, userApp: payload }

        case Actions.UPDATE_DATE_INTERVAL:
            return { ...state, dateInterval: payload }

        case Actions.UPDATE_INCOMES:
            return { ...state, incomesContext: payload }

        case Actions.UPDATE_EXPENSES:
            return { ...state, expensesContext: payload }

        case Actions.UPDATE_BUDGETS:
            return { ...state, budgetsContext: payload }

        case Actions.UPDATE_CATEGORIES:
            return { ...state, categoriesContext: payload }

        case Actions.UPDATE_COPIED_MONTH:
            return { ...state, copiedMonth: payload }

        default: return state

    }
}

export default globalReducer