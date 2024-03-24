import { Expense } from "../../data/types/Expense";

class CategoryCriteria implements ICriteria<Expense> {
    constructor(private categoryId: number[]) { }

    meetCriteria(data: Expense[]): Expense[] {
        return data.filter(expense => this.categoryId.includes(expense.categoryId));
    }
}

export default CategoryCriteria;