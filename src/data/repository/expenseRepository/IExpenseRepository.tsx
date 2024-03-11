import Expense, { ExpenseCreate } from "../../types/Expense";

interface IExpenseRespository {
    getExpenses: () => Promise<Expense[]>
    create: (expense: ExpenseCreate) => Promise<string>
}

export default IExpenseRespository