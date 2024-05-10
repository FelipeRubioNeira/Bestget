import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import ILoginRepository from "./ILoginRepository";

class LoginGoogleRepository implements ILoginRepository<User> {

    async login() {

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            return userInfo

        } catch (error) {
            console.log("Error al iniciar sesion", error);
            throw error
        }

    }

    async logout() {
        await GoogleSignin.signOut()

    }



}

export default LoginGoogleRepository