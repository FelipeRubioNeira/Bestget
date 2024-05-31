import ILoginRepository from "./ILoginRepository";
import UserApp from "../../types/UserApp";
import { GoogleSignin } from "@react-native-google-signin/google-signin";


class LoginGoogleRepository implements ILoginRepository {

    async login() {

        try {

            const hasPlayServices =  await GoogleSignin.hasPlayServices();

            if(!hasPlayServices) return null

            const { user } = await GoogleSignin.signIn();

            const { id, email, name, photo } = user

            const userApp: UserApp = {
                userId: id,
                email,
                name: name ? name : "",
                photo: photo ? photo : ""
            }

            return userApp

        } catch (error) {
            console.log("Error al iniciar sesion", error);
            return null
        }

    }

    async logout() {
        await Promise.all([
            GoogleSignin.signOut(),
        ])
    }

    async getUser(): Promise<UserApp | null> {
        return null
    }

    async saveUser() { }

    async cleanUser() { }

}

export default LoginGoogleRepository