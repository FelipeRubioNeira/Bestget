import { SortOrder, sortByDate } from "../../utils/Data";
import { Expense } from "../../data/types/Expense";

class SortCriteria implements ICriteria<Expense> {
    constructor(private dateKey: string, private sortOrder: SortOrder = 'desc') {}
  
    meetCriteria(data: Expense[]): Expense[] {
      return sortByDate(data, this.dateKey, this.sortOrder);
    }
  }

export default SortCriteria;