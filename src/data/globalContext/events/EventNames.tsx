/**
 * @description: Event names contains all the events that the application will emit and consume.
 * We separete events in two categories: Budget events and Expense events.
 * but "FROM.BUDGET" events are related to expenses that are created, edited, or deleted from a budget.
 * as we calculate remaining amount in the budget when an expense is created, edited or deleted from a budget
 * we update all budgets as well.
 */

// ----------------- Events ----------------- //
enum EventNames {
    
    // Budget events
    BUDGET_CREATED = 'BUDGET.CREATED',
    BUDGET_EDITED = 'BUDGET.EDITED',
    BUDGET_DELETED = 'BUDGET.DELETED',
    CONSUME_BUDGET_QUEUE = 'CONSUME.BUDGET.QUEUE',

    // Expense events
    EXPENSE_CREATED = 'EXPENSE.CREATED',
    EXPENSE_EDITED = 'EXPENSE.EDITED',
    EXPENSE_DELETED = 'EXPENSE.DELETED',
    CONSUME_EXPENSE_QUEUE = 'CONSUME.EXPENSE.QUEUE',

    // Expense events from budget
    EXPENSE_CREATED_FROM_BUDGET = 'EXPENSE.CREATED.FROM.BUDGET',
    EXPENSE_EDITED_FROM_BUDGET = 'EXPENSE.EDITED.FROM.BUDGET',
    EXPENSE_DELETED_FROM_BUDGET = 'EXPENSE.DELETED.FROM.BUDGET',
    
}



export {
    EventNames
}
