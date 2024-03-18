import { Expense, ExpenseCreate } from "../../types/Expense"


interface IExpenseRespository {
    getAll: () => Promise<Expense[]>
    getById: (id: string) => Promise<Expense[]>
    getWithoutBudget: () => Promise<Expense[]>
    getTotal: () => Promise<number>
    create: (expense: ExpenseCreate) => Promise<string>
    delete: (id: string) => Promise<void>
    deleteByBudgetId: (budgetId: string) => Promise<void>
}

export default IExpenseRespository