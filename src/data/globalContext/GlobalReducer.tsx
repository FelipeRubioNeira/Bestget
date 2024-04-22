import { GlobalContextType } from "./GlobalContext"
import { ActionType, Actions } from "./ActionTypes"

const globalReducer = (
    state: GlobalContextType,
    { type, payload }: ActionType
) => {

    switch (type) {

        case Actions.UPDATE_DATE_INTERVAL:
            return { ...state, dateInterval: payload }

        case Actions.UPDATE_INCOMES:
            return { ...state, incomesContext: payload }

        default: return state

    }
}

export default globalReducer