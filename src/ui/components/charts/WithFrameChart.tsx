import { StyleSheet, View } from 'react-native'
import React from 'react'
import Label from '../label/Label';
import { Colors } from '../../constants/Colors';
import { Styles } from '../../styles/Styles';
import { FontFamily, FontSize } from '../../constants/Fonts';


interface WithFrameChartProps {
    title: string
}

const WithFrameChart = <newProperties extends object>(
    WrappedComponent: (props: newProperties) => React.ReactNode
) => {

    return ({ title, ...props }: WithFrameChartProps & newProperties) => (

        <View style={FrameChartStyle.container}>

            <Label
                value={title}
                style={FrameChartStyle.title}
            />

            <WrappedComponent {...props as newProperties} />

        </View>
    );
};

export default WithFrameChart



const FrameChartStyle = StyleSheet.create({

    container: {
        padding: 10,
        width: "95%",
        backgroundColor: Colors.GRAY,
        borderRadius: Styles.BORDER_RADIUS,
        marginHorizontal: 10,
    },
    title: {
        fontFamily: FontFamily.BOLD,
        fontSize: FontSize.SMALL
    },

})