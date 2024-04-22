import { DateInterval } from "../types/DateInterval";
import { Income } from "../types/Income";


// ----------------- Actions ----------------- //
enum Actions {
    UPDATE_DATE_INTERVAL = 'UPDATE_DATE_INTERVAL',
    UPDATE_INCOMES = 'UPDATE_INCOMES',
}


// -----------------  types ----------------- //
type updateDateIntervalContextAction = {
    type: Actions.UPDATE_DATE_INTERVAL;
    payload: DateInterval;
};

type UpdateIncomesAction = {
    type: Actions.UPDATE_INCOMES;
    payload: Income[];
}




// ----------------- Action Type ----------------- //
type ActionType = updateDateIntervalContextAction | UpdateIncomesAction



// ----------------- export  ----------------- //
export type {
    ActionType
}

export {
    Actions
}
