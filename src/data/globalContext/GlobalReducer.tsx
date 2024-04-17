import { GlobalContextType } from "./GlobalContext"


type ActionType = {
    type: 'TOGGLE_DARK_MODE',
    payload?: string | number | boolean
}


const globalReducer = (state: GlobalContextType, action: ActionType) => {

    switch (action.type) {

        case 'TOGGLE_DARK_MODE':
            return { ...state, isDarkMode: !state.isDarkMode }

        default:
            return state

    }
}

export default globalReducer