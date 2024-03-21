import { ViewStyle } from 'react-native'
import { Dimensions } from 'react-native'
import { Colors } from '../constants/Colors'
import { FontFamily } from '../constants/Fonts'

enum Styles {

    BORDER_CIRCLE = 1000,
    BORDER_RADIUS = 8,
    BORDER_WIDTH = 1,
    SCREEN_PADDING = 20,

    HEIGHT = Dimensions.get('window').height,
    WIDTH = Dimensions.get('window').width,

}


export {
    Styles,
}