import { ViewStyle } from 'react-native'


export enum Styles {
    BORDER_RADIUS = 8,
    BORDER_WIDTH = 1,
    SCREEN_PADDING = 20,
}

export const DefaultStyles = Object.freeze({

    SCREEN: {
        height: "100%",
        width: "100%",
        padding: Styles.SCREEN_PADDING,
    } as ViewStyle, // an object act as a type

})