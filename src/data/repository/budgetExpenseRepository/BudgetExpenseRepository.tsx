import { Collections } from "../../collections/Collections";
import {BudgetExpense} from "../../types/BudgetExpense";
import IBudgetExpenseRepository from "./IBugetExpenseRepository";
import firestore from '@react-native-firebase/firestore';

class BudgetExpenseRepository implements IBudgetExpenseRepository {

    async create(budgetExpense: BudgetExpense): Promise<void> {

        try {

            await firestore()
                .collection(Collections.BUDGET_EXPENSE)
                .add(budgetExpense)


        } catch (error) {
            console.error("error getCategories repository", error);
        }
    }

}

export default BudgetExpenseRepository;