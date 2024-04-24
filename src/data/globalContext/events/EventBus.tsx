import EventEmitter from "eventemitter3";
import { EventNames } from "./EventNames";
import { useEffect, useState } from "react";

const eventEmitter = new EventEmitter()

const useEventBus = () => {


    // ----------------- event queue----------------- //
    const [budgetCreatedQueue, setBudgetCreatedQueue] = useState([])
    const [expenseCreatedQueue, setExpenseCreatedQueue] = useState([])


    
    const events = [
        EventNames.BUDGET_CREATED,
        EventNames.BUDGET_EDITED,
        EventNames.BUDGET_DELETED,
        EventNames.EXPENSE_CREATED,
        EventNames.EXPENSE_EDITED,
        EventNames.EXPENSE_DELETED,
        // ... more events
    ]



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
    const emmitEvent = (eventName: EventNames, payload: any) => {
        eventEmitter.emit(eventName, { eventName, payload })
    }


    // ----------------- event handler  ----------------- //
    const handleEvents = (event: {
        eventName: EventNames, // name of the event
        payload: any // data of the event
    }) => {

        console.log("Event received: ", event.eventName, event.payload);

    }



    return {
        emmitEvent,

    }


}


export default useEventBus