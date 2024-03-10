import Expense from "../../types/Expense";

interface IExpenseRespository {
    getExpenses: () => Promise<Expense[]>
}

export default IExpenseRespository