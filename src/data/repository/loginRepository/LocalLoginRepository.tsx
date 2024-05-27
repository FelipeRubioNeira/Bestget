import AsyncStorage from "@react-native-async-storage/async-storage";
import UserApp from "../../types/UserApp";
import ILoginRepository from "./ILoginRepository";
import AsyncStorageKeys from "../../asyncStorageKeys/AsyncStorageKeys";

class LocalLoginRepository implements ILoginRepository {

    async login() {
        return null
    }

    async logout() {
        return
    }

    async saveUser(user: UserApp) {
        try {
            await AsyncStorage.setItem(AsyncStorageKeys.USER, JSON.stringify(user))
        } catch (error) {
            console.log("Error al guardar usuario en el storage", error);
        }
    }

    async getUser(): Promise<UserApp | null>{

        try {
            const user = await AsyncStorage.getItem(AsyncStorageKeys.USER)
            if (!user) return null
            return JSON.parse(user)

        } catch (error) {
            console.log("Error al obtener usuario del storage", error);
            return null

        }
    }

    async cleanUser() {
        try {
            await AsyncStorage.removeItem(AsyncStorageKeys.USER)
        } catch (error) {
            console.log("Error al limpiar usuario del storage", error);
        }
    }

}

export default LocalLoginRepository