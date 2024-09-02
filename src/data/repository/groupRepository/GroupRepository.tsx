import { Collections } from "../../collections/Collections";
import { Group, GroupKeys, UserGroup, UserGroupKeys } from "../../types/Group";
import firestore from '@react-native-firebase/firestore';
import IGroupRepository from "./IGroupRepository";
import { QueryParams } from "../../types/QueryParams";


class GroupRepository implements IGroupRepository {

    public async create(group: Group, userId: string): Promise<Group | null> {

        try {

            const db = firestore()

            const groupRef = db.collection(Collections.GROUP).doc();
            const userGroupRef = db.collection(Collections.USER_GROUP).doc();


            const newGroup: Group = {
                ...group,
                groupId: groupRef.id,
            }

            const newUserGroup: UserGroup = {
                groupId: groupRef.id,
                userId: userId,
            }

            await Promise.all([
                groupRef.set(newGroup),
                userGroupRef.set(newUserGroup),
            ])

            return newGroup

        } catch (error) {
            console.log("error createGroup GroupRepository", error);
            return null
        }

    }

    public async getAll(userId: string): Promise<Group[]> {

        try {

            const db = firestore()

            const userGroups = await db.collection(Collections.USER_GROUP)
                .where(UserGroupKeys.USER_ID, '==', userId)
                .get()



            const groupIds: string[] = userGroups.docs.map(group => {
                const data = group.data() as UserGroup
                return data.groupId
            })

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

}

export default GroupRepository