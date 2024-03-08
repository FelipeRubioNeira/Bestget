import { ViewStyle } from 'react-native'
import { Dimensions } from 'react-native'
import { Colors } from './Colors'

export enum Styles {

    BORDER_CIRCLE = 1000,
    BORDER_RADIUS = 8,
    BORDER_WIDTH = 1,
    SCREEN_PADDING = 20,

    HEIGHT = Dimensions.get('window').height,
    WIDTH = Dimensions.get('window').width,


}

export const DefaultStyles = Object.freeze({

    SCREEN: {
        height: "100%",
        width: "100%",
        padding: Styles.SCREEN_PADDING,
    } as ViewStyle, // an object act as a type

    SHADOW: {
        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    } as ViewStyle

})