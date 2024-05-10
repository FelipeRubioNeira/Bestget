import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import useLoginViewModel from './LoginViewModel';
import Screen from '../../components/screen/Screen';
import Label from '../../components/label/Label';
import { FontFamily, FontSize } from '../../constants/Fonts';
import { Colors } from '../../constants/Colors';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import Spacer from '../../components/spacer/Spacer';
import Icons from '../../../assets/icons';
import { LoginScreenProps } from '../../../navigation/NavigationParamList';
import LoginUseCase from '../../../domain/useCases/LoginUseCase';
import LoginGoogleRepository from '../../../data/repository/loginRepository/LoginGoogleRepository';
import ILoginRepository from '../../../data/repository/loginRepository/ILoginRepository';



const loginUseCase = new LoginUseCase()


const LoginScreen = ({ navigation, route }: LoginScreenProps) => {


    // ------------------ viewModel ------------------ //
    const { loginGoogle } = useLoginViewModel({
        navigation,
        route,
        loginUseCase
    })


    // ------------------ UI ------------------ //
    return (

        <Screen style={{ backgroundColor: Colors.DARK_GREEN }}>


            <View style={LoginStyles.welcomeContainer}>
                <Label
                    value="Bievenido a"
                    fontSize={FontSize.LARGE}
                    fontFamily={FontFamily.BOLD}
                />

                <Label
                    value="Bestget!"
                    fontSize={FontSize.LARGE}
                    fontFamily={FontFamily.BOLD}
                />

                <Spacer marginVertical={"4%"} />

                <Image
                    source={Icons.wallet}
                    style={LoginStyles.walletImage}
                />

            </View>

            <Spacer marginVertical={"15%"} />


            <View>
                <Label
                    value="Crea una cuenta o ingresa con tu cuenta de Google"
                    style={LoginStyles.enterAccount}
                />

                <GoogleSigninButton
                    onPress={loginGoogle}
                    disabled={false}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    style={LoginStyles.googleButton}
                />
            </View>

            <Spacer marginVertical={"15%"} />


            <Label
                value="Esta aplicación te ayudará a llevar el control de tus gastos e ingresos."
                style={LoginStyles.introMessage}
            />

            <Image
                source={Icons.piggyBank}
                style={LoginStyles.piggyImage}
            />


            <View style={{ flex: 1 }} />

            <Label
                value="Pronto agregaremos mas métodos de ingreso..."
                fontFamily={FontFamily.LIGHT}
                fontSize={FontSize.XXSMALL}
            />



        </Screen>
    )
}

export default LoginScreen

const LoginStyles = StyleSheet.create({

    welcomeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
    },
    googleButton: {
        alignSelf: 'center',
        marginTop: 20
    },
    enterAccount: {
        textAlign: 'center',
        fontFamily: FontFamily.BLACK,
        fontSize: FontSize.SMALL
    },
    walletImage: {
        width: 70,
        height: 70,
        transform: [{ rotate: '10deg' }]
    },
    piggyImage: {
        marginTop: "2%",
        width: 40,
        height: 40,
        alignSelf: 'center'
    },
    introMessage: {
        textAlign: 'center',
        color: Colors.BLACK,
        fontSize: FontSize.XSMALL,
        fontFamily: FontFamily.LIGHT
    }

})
