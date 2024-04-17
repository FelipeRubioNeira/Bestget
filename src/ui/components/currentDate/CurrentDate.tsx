import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TouchableIcon from '../touchableIcon/TouchableIcon'
import Icons from '../../../assets/icons'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Label from '../label/Label'
import { Colors } from '../../constants/Colors'
import { Styles } from '../../styles/Styles'
import useCurrentDateViewModel from './CurrentDateViewModel'


// ------------------ types ------------------ //
type CurrentDateProps = {
    date: string,
    showDate: () => void
}

// ------------------ Component ------------------ //
const CurrentDate = ({ date, showDate }: CurrentDateProps) => {

    const { currentDate } = useCurrentDateViewModel(date)


    return (
        <TouchableOpacity
            onPress={showDate}
            style={currentDateStyles.container}>

            <Label
                value={currentDate}
                fontSize={FontSize.MEDIUM}
                fontFamily={FontFamily.BOLD}
            />

            <TouchableIcon disabled image={Icons.calendarEdit} />

        </TouchableOpacity>
    )
}

export default CurrentDate

const currentDateStyles = StyleSheet.create({

    container: {
        flexDirection: "row",
        width: "100%",
        borderWidth: 1,
        borderColor: Colors.GRAY,
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: Styles.BORDER_RADIUS,
        paddingHorizontal: 20,
        height: 50,
        justifyContent: "space-between",
        alignItems: "center"
    }
})