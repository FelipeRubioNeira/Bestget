import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FontFamily, FontSize } from '../../constants/Fonts'
import Label from '../label/Label'
import { PieChart } from 'react-native-chart-kit'
import { Styles } from '../../styles/Styles'
import { Colors } from '../../constants/Colors'

type ChartProps = {
    title: string,
    data: any[],
}

const PieChartComponent = ({ title, data }: ChartProps) => {

    return (

        <View style={PieChartStyles.container}>

            <Label
                value={title}
                style={PieChartStyles.title}
            />

            <PieChart
                data={data}
                width={300}
                height={300}
                paddingLeft={"100"}
                hasLegend={false}
                accessor={"amount"}
                backgroundColor={"transparent"}
                chartConfig={{ color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }}
            />

            <ChartLegend
                value='Escenciales 51%'
                color={Colors.CHIP_ESSENTIALS}
            />

        </View>
    )

}

type LegendProps = {
    value: string,
    color: string,
}

const ChartLegend = ({ value, color }: LegendProps) => {

    return (
        <View style={{ flexDirection: "row" }}>

            <Label
                value={value}
                style={PieChartStyles.legendLabel}
            />

            <View style={{
                backgroundColor: color,
                ...PieChartStyles.legendIcon
            }} />

        </View>
    )

}


const PieChartStyles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: "95%",
        backgroundColor: Colors.GRAY,
        borderRadius: Styles.BORDER_RADIUS,
        marginHorizontal: 10,
    },
    title: {
        marginLeft: 10,
        marginTop: 10,
        fontFamily: FontFamily.BOLD,
        fontSize: FontSize.SMALL
    },
    legendLabel: {
        marginLeft: 10,
        marginTop: 10,
        fontFamily: FontFamily.BOLD,
        fontSize: FontSize.XXSMALL
    },
    legendIcon: {
        width: 15,
        aspectRatio: 1,
        borderRadius: 50,
        marginLeft: 5,
        marginTop: 10
    }
})

export default PieChartComponent