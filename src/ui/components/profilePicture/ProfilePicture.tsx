import { ImageStyle, StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import Label from '../label/Label'
import { FontFamily, FontSize } from '../../constants/Fonts'
import useProfilePictureViewModel from './ProfilePictureViewModel'


// ------------------ ProfilePicture ------------------ //


type ProfilePictureProps = {
    photo: string
    name: string
    style?: ImageStyle
}

const ProfilePicture = ({
    photo,
    name,
    style,
}: ProfilePictureProps) => {

    const {
        username
    } = useProfilePictureViewModel({ name })

    return (

        <View style={ProfilePictureStyle.container}>

            {
                photo ?
                    <Image
                        source={{ uri: photo }}
                        style={{
                            ...ProfilePictureStyle.profilePicture,
                            ...style
                        }}
                    />
                    :
                    <Label
                        value={username}
                        fontFamily={FontFamily.BOLD}
                        fontSize={FontSize.LARGE}
                    />
            }

        </View>

    )
}

export default ProfilePicture

const ProfilePictureStyle = StyleSheet.create({

    container: {
        backgroundColor: Colors.GRAY,
        borderRadius: 500,
        width: 100,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
    }

})