import React from 'react'
import {View } from 'react-native'
import { GoogleSigninButton} from '@react-native-google-signin/google-signin';
import useLoginViewModel from './LoginViewModel';


const LoginScreen = () => {

    const { loginGoogle } = useLoginViewModel()

    return (

        <View>

            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                disabled={false}
                onPress={loginGoogle}
            />

        </View>
    )
}

export default LoginScreen
