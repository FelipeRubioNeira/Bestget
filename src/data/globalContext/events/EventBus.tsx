import React from "react";
import EventEmitter from "eventemitter3";
import { EventNames } from "./EventNames";
import { ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import eventBusReducer, { defaultEventBusState } from "./EventBusReducer";




// -- Event Emitter -- //
const eventEmitter = new EventEmitter()



// ----------------- context ----------------- //
export const EventBus = createContext(defaultEventBusState)


// ----------------- provider ----------------- //
export const EventBusProvider = ({ children }: { children: ReactNode }) => {


    // ----------------- state ----------------- //
    const [state, dispatch] = useReducer(eventBusReducer, defaultEventBusState)


    // ----------------- events ----------------- //
    const events: EventNames[] = Object.values(EventNames)


    // ----------------- exange ----------------- //
    useEffect(() => {

        // we subscribe to the events
        events.forEach(event => eventEmitter.on(event, handleEvents));


        // clean up
        return () => {
            events.forEach(event => eventEmitter.off(event, handleEvents));
        }

    }, [])


    // ----------------- Emit event ----------------- //
    // TODO add a type to the payload
    const emmitEvent = (eventName: EventNames, payload: any) => {
        eventEmitter.emit(eventName, { eventName, payload })
    }


    // ----------------- event handler  ----------------- //
    const handleEvents = (event: { eventName: EventNames }) => { // name of the event
        dispatch(event.eventName)
    }

    const consumeBudgetsQueue = () => {
        dispatch(EventNames.CONSUME_BUDGET_QUEUE)
    }

    const consumeExpensesQueue = () => {
        dispatch(EventNames.CONSUME_EXPENSE_QUEUE)

    }

    return (
        <EventBus.Provider value={{
            budgetsQueue: state.budgetsQueue,
            expensesQueue: state.expensesQueue,
            emmitEvent,
            consumeBudgetsQueue,
            consumeExpensesQueue
        }}>
            {children}
        </EventBus.Provider>
    )



}


// ----------------- useEventBus ----------------- //
export const useEventBus = () => useContext(EventBus)