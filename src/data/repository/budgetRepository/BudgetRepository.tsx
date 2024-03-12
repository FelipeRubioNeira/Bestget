import { Collections } from "../../collections/Collections";
import { BudgetCreate } from "../../types/Budget";
import IBudgetRepository from "./IBudgetRepository";
import firestore from '@react-native-firebase/firestore';

class BudgetRepository implements IBudgetRepository {

    async create(budget: BudgetCreate): Promise<string> {

        try {

            const result = await firestore().
                collection(Collections.BUDGET)
                .add(budget)

            const budgetId = result.id

            return (budgetId)

        } catch (error) {
            console.error("error BudgetRepository create", error);
            return ""
        }

    }

}

export default BudgetRepository