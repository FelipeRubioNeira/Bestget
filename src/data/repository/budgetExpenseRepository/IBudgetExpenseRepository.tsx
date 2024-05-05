import { Budget } from "../../types/Budget"
import { DateInterval } from "../../types/DateInterval"

interface IBudgetExpenseRepository {
    getAllWithRemaining({ initialDate, finalDate }: DateInterval): Promise<Budget[]> 

}

export default IBudgetExpenseRepository