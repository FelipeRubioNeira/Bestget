import { Expense, ExpenseCreate } from "../../types/Expense"


interface IExpenseRespository {
    getAll: () => Promise<Expense[]>
    create: (expense: ExpenseCreate) => Promise<string>
}

export default IExpenseRespository