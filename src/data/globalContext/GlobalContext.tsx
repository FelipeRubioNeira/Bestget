import { createContext, useContext, useReducer } from "react";
import globalReducer from "./GlobalReducer";

// 1- Create a context
export type GlobalContextType = {
    isDarkMode: boolean,
    toggleDarkMode: () => void
}

// 1.1- Default values
const DefaultGlobalContext: GlobalContextType = {
    isDarkMode: false,
    toggleDarkMode: () => { }
}

const GlobalContext = createContext(DefaultGlobalContext)


// 2- Create a provider
export const ProviderContextComponent = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(globalReducer, DefaultGlobalContext)

    const toggleDarkMode = () => {
        dispatch({ type: 'TOGGLE_DARK_MODE' })
    }

    return (
        <GlobalContext.Provider
            children={children}
            value={{
                isDarkMode: state.isDarkMode,
                toggleDarkMode: toggleDarkMode
            }}
        />

    )
}

// 3- Create a hook
export const useGlobalContext = () => {
    return useContext(GlobalContext)
}