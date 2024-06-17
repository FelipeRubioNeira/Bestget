import { View } from 'react-native'
import React from 'react'
import Label from '../../components/label/Label'
import ButtonApp from '../../components/buttonApp/ButtonApp'
import Screen from '../../components/screen/Screen'
import { useAppSelector } from '../../../data/globalContext/StoreHooks'
import { selectUserApp } from '../../../data/globalContext/slices/UserAppSlice'
import TextInputWithLabel from '../../components/textInputWithLabel/TextInputWithLabel'
import Spacer from '../../components/spacer/Spacer'
import { FontFamily } from '../../constants/Fonts'
import ProfilePicture from '../../components/profilePicture/ProfilePicture'
import { ProfileScreenProps } from '../../../navigation/NavigationParamList'
import useProfileViewModel from './ProfileViewModel'



// ------------------ ProfileScreen ------------------ //

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {


    // ------------------ context ------------------ //
    const {
        userId,
        name,
        photo,
        email,
    } = useAppSelector(selectUserApp)


    // ------------------ view model ------------------ //
    const {
        closeSession
    } = useProfileViewModel({ navigation, route })


    return (
        <Screen>

            <View>

                <Label
                    value='Perfil'
                    fontFamily={FontFamily.BOLD}
                />

                <ProfilePicture photo={photo} name={name} />

                <Spacer marginVertical={"8%"} />

                <TextInputWithLabel
                    title='Nombre'
                    value={name}
                    editable={false}
                />

                <Spacer marginVertical={"2%"} />

                <TextInputWithLabel
                    title='Correo'
                    value={email}
                    editable={false}
                />

                <Spacer marginVertical={"2%"} />

                <TextInputWithLabel
                    title='Id usuario'
                    value={userId}
                    editable={false}
                />

            </View>


            <ButtonApp
                title='Cerrar sesión'
                onPress={closeSession}
            />

        </Screen>
    )
}

export default ProfileScreen
