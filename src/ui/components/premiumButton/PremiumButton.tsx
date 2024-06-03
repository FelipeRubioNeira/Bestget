import { TouchableOpacity } from 'react-native'
import React from 'react'
import Label from '../label/Label'
import Spacer from '../spacer/Spacer'
import TouchableIcon from '../touchableIcon/TouchableIcon'
import Icons from '../../../assets/icons'
import { Colors } from '../../constants/Colors'
import PremiumButtonStyles from './PremiumButtonStyles'


const PremiumButton = () => {

    return (
        <TouchableOpacity style={PremiumButtonStyles.container}>

            <Label
                value='Funcionalida Premium'
                style={PremiumButtonStyles.label}
            />

            <Spacer marginHorizontal={"4%"} />

            <TouchableIcon
                disabled
                image={Icons.premium}
                color={Colors.BLACK}
            />
        </TouchableOpacity>
    )
}

export default PremiumButton
