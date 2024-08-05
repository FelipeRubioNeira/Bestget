import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageKeys from "../../asyncStorageKeys/AsyncStorageKeys";
import { DateInterval } from "../../types/DateInterval";
import ISavedDateRepository from "./ISavedDateRepository";

class SavedDateRepository implements ISavedDateRepository{

    async saveDate(dateInterval: DateInterval): Promise<void> {

        try {
            const dateIntervalString = JSON.stringify(dateInterval)
            await AsyncStorage.setItem(AsyncStorageKeys.SAVED_DATE, dateIntervalString)

        } catch (error) {
            console.log("Error saving savedDate", error);

        }

    }

    async getDate(): Promise<DateInterval | null> {

        try {
            const savedDate = await AsyncStorage.getItem(AsyncStorageKeys.SAVED_DATE)

            if (savedDate) {
                return JSON.parse(savedDate)

            } else return null

        } catch (error) {
            console.log("Error getting savedDate", error);
            return null

        }
    }

}

export default SavedDateRepository