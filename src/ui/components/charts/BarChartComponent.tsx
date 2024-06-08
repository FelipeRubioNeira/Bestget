import { StyleSheet, View } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-chart-kit'
import { Styles } from '../../styles/Styles'
import { Colors } from '../../constants/Colors'
import { FontFamily, FontSize } from '../../constants/Fonts'
import ColorsApp from '../../../utils/Colors'
import { currencyFormat } from '../../../utils/NumberFormat'

type BarChartProps = {
    data: number[],
}

const BarChartComponent = ({ data }: BarChartProps) => {

    return (

        <View style={{ marginTop: "4%" }}>

            <BarChart
                data={{
                    labels: ["Ingresos", "Gastos"],
                    datasets: [
                        {
                            data: data,
                            colors: [
                                () => ColorsApp.hexToRGB(Colors.GREEN),
                                () => ColorsApp.hexToRGB(Colors.RED),
                            ],
                        },
                    ]
                }}
                fromZero={true}
                showValuesOnTopOfBars={true}
                withCustomBarColorFromData={true}
                showBarTops={false}
                flatColor={true}
                segments={4}
                width={Styles.WIDTH * 0.85}
                height={300}
                yAxisLabel=""
                yLabelsOffset={-10}
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    formatYLabel: (value) => `$${currencyFormat(value)}`,
                    formatTopBarValue: value => currencyFormat(value),
                    color: () => ColorsApp.hexToRGB(Colors.BLACK),
                    labelColor: () => ColorsApp.hexToRGB(Colors.BLACK),
                    barRadius: Styles.BORDER_RADIUS,
                    backgroundGradientFrom: Colors.GRAY,
                    backgroundGradientTo: Colors.GRAY,
                    decimalPlaces: 0,
                    barPercentage: 2,
                    strokeWidth: 2,
                    propsForLabels: {
                        fontFamily: FontFamily.BOLD,
                        fontSize: FontSize.XXXSMALL, // Reduce el tamaño de la fuente
                    },
                    propsForVerticalLabels: {
                        fontFamily: FontFamily.BOLD
                    },
                }}
            />

        </View>
    )
}

export default BarChartComponent

const styles = StyleSheet.create({})