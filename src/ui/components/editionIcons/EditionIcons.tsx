import { StyleSheet, View } from 'react-native'
import React from 'react'
import TouchableIcon from '../touchableIcon/TouchableIcon'
import { Colors } from '../../constants/Colors'
import Spacer from '../spacer/Spacer'

const minusIcon = require("../../../assets/icons/ic_delete_circle.png")
const editIcon = require("../../../assets/icons/ic_edit_circle.png")

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
                image={editIcon}
                color={Colors.CHIP_SAVINGS}
                onPress={onEdit}
            />

            <Spacer marginHorizontal={"4%"}/>

            <TouchableIcon
                image={minusIcon}
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