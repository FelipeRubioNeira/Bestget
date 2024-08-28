import { Collections } from "../../collections/Collections";
import { Group, UserGroup } from "../../types/Group";
import firestore from '@react-native-firebase/firestore';
import IGroupRepository from "./IGroupRepository";


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

}

export default GroupRepository