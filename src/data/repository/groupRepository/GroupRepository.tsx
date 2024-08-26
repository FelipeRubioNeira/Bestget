import { Collections } from "../../collections/Collections";
import { Group } from "../../types/Group";
import firestore from '@react-native-firebase/firestore';
import IGroupRepository from "./IGroupRepository";


class GroupRepository implements IGroupRepository {

    public async create(group: Group): Promise<Group | null> {

        try {

            const newDocRef = firestore().collection(Collections.GROUP).doc();

            const newGroup = {
                ...group,
                groupId: newDocRef.id,
            }

            await newDocRef.set(newGroup);
            return newGroup

        } catch (error) {
            console.log("error createGroup GroupRepository", error);
            return null
        }

    }

}

export default GroupRepository