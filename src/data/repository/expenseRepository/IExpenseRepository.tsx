import { Expense, ExpenseCreate } from "../../types/Expense"


interface IExpenseRespository {
    getAll: () => Promise<Expense[]>
    getById: (id: string) => Promise<Expense[]>
    getWithoutBudget: () => Promise<Expense[]>
    create: (expense: ExpenseCreate) => Promise<string>

}

export default IExpenseRespository