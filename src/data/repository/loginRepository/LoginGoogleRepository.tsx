import ILoginRepository from "./ILoginRepository";
import UserApp from "../../types/User";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageKeys from "../../asyncStorageKeys/AsyncStorageKeys";



class LoginGoogleRepository implements ILoginRepository {

    async login() {

        try {

            await GoogleSignin.hasPlayServices();
            const { user } = await GoogleSignin.signIn();

            const { id, email, name, photo } = user

            const userApp: UserApp = {
                userId: id,
                email,
                name: name ? name : "",
                photo: photo ? photo : ""
            }

            // save user in the storage
            await this.saveUser(userApp)
            return userApp

        } catch (error) {
            console.log("Error al iniciar sesion", error);
            throw error
        }

    }

    async logout() {
        await Promise.all([
            GoogleSignin.signOut(),
            this.cleanUser()
        ])
    }

    async saveUser(user: UserApp) {
        try {
            await AsyncStorage.setItem(AsyncStorageKeys.USER, JSON.stringify(user))
        } catch (error) {
            console.log("Error al guardar usuario en el storage", error);

        }
    }

    async getUser(): Promise<UserApp | null> {

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

export default LoginGoogleRepository