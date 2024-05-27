import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import useLoginViewModel from './LoginViewModel';
import Screen from '../../components/screen/Screen';
import Label from '../../components/label/Label';
import { FontFamily, FontSize } from '../../constants/Fonts';
import { Colors } from '../../constants/Colors';
import Spacer from '../../components/spacer/Spacer';
import Icons from '../../../assets/icons';
import { LoginScreenProps } from '../../../navigation/NavigationParamList';
import LoginUseCase from '../../../domain/useCases/LoginUseCase';
import ButtonApp from '../../components/buttonApp/ButtonApp';
import Modal from '../../components/modal/Modal';
import LocalLoginRepository from '../../../data/repository/loginRepository/LocalLoginRepository';


const localLoginRepository = new LocalLoginRepository()
const loginUseCase = new LoginUseCase(localLoginRepository)


const LoginScreen = ({ navigation, route }: LoginScreenProps) => {


    // ------------------ viewModel ------------------ //
    const { loginGoogle, modalState } = useLoginViewModel({
        navigation,
        route,
        localLoginRepository,
        loginUseCase,
    })


    // ------------------ UI ------------------ //
    return (

        <Screen style={{ backgroundColor: Colors.GREEN }}>


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



            <View>

                <Label
                    value="Crea una cuenta o ingresa con tu cuenta de Google"
                    style={LoginStyles.enterAccount}
                />

                <Spacer marginVertical={"10%"} />

                <ButtonApp
                    title="Acceder con Google"
                    image={Icons.google}
                    onPress={loginGoogle}
                    buttonStyle={{ backgroundColor: Colors.BLUE }}
                    labelStyle={{
                        color: Colors.WHITE,
                        fontFamily: FontFamily.BOLD,
                        fontSize: FontSize.SMALL
                    }}
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

            <Modal
                visible={modalState.visible}
                title={modalState.title}
                message={modalState.message}
                buttonList={modalState.buttonList}
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
