import { ViewStyle } from 'react-native'
import { Dimensions } from 'react-native'

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

})