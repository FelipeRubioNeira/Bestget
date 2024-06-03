import { Dimensions } from 'react-native'

enum Styles {

    BORDER_CIRCLE = 1000,
    BORDER_RADIUS = 8,
    BORDER_WIDTH = 1,
    SCREEN_PADDING = 12,
    BUTTON_HEIGHT = 60,
    INPUT_HEIGHT = 65,

    HEIGHT = Dimensions.get('window').height,
    WIDTH = Dimensions.get('window').width,

}


export {
    Styles,
}