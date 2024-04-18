import { StyleSheet, View } from 'react-native'
import React from 'react'
import TouchableIcon from '../touchableIcon/TouchableIcon'
import { Colors } from '../../constants/Colors'
import Spacer from '../spacer/Spacer'
import Icons from '../../../assets/icons'



type EditionIconsProps = {
    onEdit?: () => void,
    onDelete?: () => void
}


const EditionIcons = ({
    onEdit = () => { },
    onDelete = () => { }
}:EditionIconsProps) => {
    
    return (

        <View style={editionStyle.container}>

            <TouchableIcon
                image={Icons.editCircle}
                color={Colors.CHIP_SAVINGS}
                onPress={onEdit}
            />

            <Spacer marginHorizontal={"4%"}/>

            <TouchableIcon
                image={Icons.deleteCircle}
                color={Colors.CHIP_DEBTS}
                onPress={onDelete}
            />

        </View>
    )
}


const editionStyle = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
        width: 70,
        height: "100%",
    }
})

export default EditionIcons