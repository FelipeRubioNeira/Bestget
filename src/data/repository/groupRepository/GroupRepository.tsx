import { Collections } from "../../collections/Collections";
import { Group, GroupKeys, UserGroup, UserGroupKeys } from "../../types/Group";
import firestore from '@react-native-firebase/firestore';
import IGroupRepository from "./IGroupRepository";


class GroupRepository implements IGroupRepository {

    async create(group: Group, userId: string): Promise<Group | null> {

        try {

            const db = firestore()
            const groupRef = db.collection(Collections.GROUP).doc();

            const newGroup: Group = {
                ...group,
                groupId: groupRef.id,
            }

            await Promise.all([
                groupRef.set(newGroup),
                this.joinToGroup(userId, groupRef.id)
            ])

            return newGroup

        } catch (error) {
            console.log("error createGroup GroupRepository", error);
            return null
        }

    }

    async getAll(userId: string): Promise<Group[]> {

        try {

            const db = firestore()

            const userGroups = await db.collection(Collections.USER_GROUP)
                .where(UserGroupKeys.USER_ID, '==', userId)
                .get()

            const groupIds: string[] = userGroups.docs.map(group => {
                const data = group.data() as UserGroup
                return data.groupId
            })

            // if there are no groups, we return an empty array
            if (groupIds.length === 0) return []

            const groups = await db.collection(Collections.GROUP)
                .where(GroupKeys.GROUP_ID, 'in', groupIds)
                .get()

            const groupsArray = groups.docs.map(doc => {
                const data = doc.data() as Group
                return data
            });

            return groupsArray

        } catch (error) {
            console.log("error getGroups GroupRepository", error);
            return []
        }

    }

    async existsByGroupId(groupId: string): Promise<boolean> {

        try {

            const db = firestore()

            const group = await db.collection(Collections.GROUP)
                .doc(groupId)
                .get()

            return group.exists

        } catch (error) {
            console.log("error existsByGroupId GroupRepository", error);
            return false
        }

    }

    async existsUserInGroup(userId: string, groupId: string): Promise<boolean> {

        try {

            const db = firestore()

            const userGroup = await db.collection(Collections.USER_GROUP)
                .where(UserGroupKeys.USER_ID, '==', userId)
                .where(UserGroupKeys.GROUP_ID, '==', groupId)
                .get()

            return userGroup.docs.length > 0

        } catch (error) {
            console.log("error existsUserInGroup GroupRepository", error);
            return false
        }

    }

    async joinToGroup(userId: string, groupId: string): Promise<boolean> {

        try {

            const db = firestore()

            const userGroupRef = db.collection(Collections.USER_GROUP).doc()

            const newUserGroup: UserGroup = {
                groupId: groupId,
                userId: userId,
                createdDate: new Date()
            }

            await userGroupRef.set(newUserGroup)

            return true

        } catch (error) {
            console.log("error joinToGroup GroupRepository", error);
            return false
        }

    }

    async delete(groupId: string): Promise<boolean> {

        try {

            const db = firestore()

            // group reference
            const groupRef = db.collection(Collections.GROUP).doc(groupId)

            const [
                userGroupRef,
                // incomesGroupRef,
                // expensesGroupRef,
                // budgetGroupRef
            ] = await Promise.all([

                db.collection(Collections.USER_GROUP)
                    .where(UserGroupKeys.GROUP_ID, '==', groupId)
                    .get(),

                // db.collection(Collections.INCOME_GROUP)
                //     .where(IncomeGroupKeys.GROUP_ID, '==', groupId)
                //     .get(),

                // db.collection(Collections.EXPENSE)
                //     .where(GroupKeys.GROUP_ID, '==', groupId)
                //     .get(),

                // db.collection(Collections.BUDGET)
                //     .where(GroupKeys.GROUP_ID, '==', groupId)
                //     .get()

            ])

            // we get the ids of the incomes to delete them
            // const incomeIds = incomesGroupRef.docs.map(doc => doc.id)
            // const expenseIds = expensesGroupRef.docs.map(doc => doc.id)
            // const budgetIds = budgetGroupRef.docs.map(doc => doc.id)

            // const [
            //     incomeRefs,
            //     expenseRefs,
            //     budgetRefs
            // ] = await Promise.all([

            //     db.collection(Collections.INCOME)
            //         .where(IncomeKeys.INCOME_ID, 'in', incomeIds)
            //         .get(),

            //     db.collection(Collections.EXPENSE)
            //         .where(IncomeKeys.INCOME_ID, 'in', expenseIds)
            //         .get(),

            //     db.collection(Collections.BUDGET)
            //         .where(IncomeKeys.INCOME_ID, 'in', budgetIds)
            //         .get()
            // ])


            await Promise.all([

                // delete group and user group
                groupRef.delete(),
                userGroupRef.docs.map(doc => doc.ref.delete()),

                // // delete incomes 
                // incomesGroupRef.docs.map(doc => doc.ref.delete()),
                // incomeRefs.docs.map(doc => doc.ref.delete()),

                // // delete expenses
                // expensesGroupRef.docs.map(doc => doc.ref.delete()),
                // expenseRefs.docs.map(doc => doc.ref.delete()),

                // // delete budgets
                // budgetGroupRef.docs.map(doc => doc.ref.delete()),
                // budgetRefs.docs.map(doc => doc.ref.delete())

            ])

            return true

        } catch (error) {
            console.log("error deleteGroup GroupRepository", error);
            return false
        }

    }

}

export default GroupRepository