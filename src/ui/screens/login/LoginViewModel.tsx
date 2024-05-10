/**
 * GoogleSignin has been setup in App.tsx
 */
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const useLoginViewModel = () => {

    const loginGoogle = async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log("userInfo", userInfo);
    }

    return {
        loginGoogle
    }


}

export default useLoginViewModel