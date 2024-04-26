

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

}



export {
    EventNames
}
