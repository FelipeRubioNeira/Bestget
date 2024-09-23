import { EventNames } from "./EventNames";



// ----------------- event ----------------- //
export type Event = {
    eventName: EventNames,
}


// ----------------- event queue----------------- //
export type EventBusState = {
    budgetsQueue: Event[],
    expensesQueue: Event[],
    emmitEvent: (eventName: EventNames, payload: any) => void,
    consumeBudgetsQueue: () => void,
    consumeExpensesQueue: () => void
}


// ----------------- default state ----------------- //
export const defaultEventBusState: EventBusState = {
    budgetsQueue: [],
    expensesQueue: [],
    emmitEvent: () => { },
    consumeBudgetsQueue: () => { },
    consumeExpensesQueue: () => { }
}

// ----------------- reducer ----------------- //
const eventBusReducer = (state: EventBusState, eventName: EventNames) => {

    console.log("Evento recibido: ", eventName);
    

    switch (eventName) {

        // budget cases
        case EventNames.BUDGET_CREATED:
        case EventNames.BUDGET_EDITED:
        case EventNames.BUDGET_DELETED:
            return { ...state, budgetsQueue: [...state.budgetsQueue, { eventName }] }


        // expense cases
        case EventNames.EXPENSE_CREATED:
        case EventNames.EXPENSE_EDITED:
        case EventNames.EXPENSE_DELETED:
        case EventNames.EXPENSE_CREATED_FROM_BUDGET:
        case EventNames.EXPENSE_EDITED_FROM_BUDGET:
        case EventNames.EXPENSE_DELETED_FROM_BUDGET:
            return { ...state, expensesQueue: [...state.expensesQueue, { eventName }] }


        case EventNames.CONSUME_BUDGET_QUEUE:
            return { ...state, budgetsQueue: [] }

        case EventNames.CONSUME_EXPENSE_QUEUE:
            return { ...state, expensesQueue: [] }

        default:
            return state;
    }

}


export default eventBusReducer