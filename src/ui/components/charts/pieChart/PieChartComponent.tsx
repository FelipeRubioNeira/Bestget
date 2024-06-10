import { StyleSheet, Switch, View } from 'react-native'
import React from 'react'
import { FontFamily, FontSize } from '../../../constants/Fonts'
import Label from '../../label/Label'
import { Colors } from '../../../constants/Colors'
import { PieChartItem } from '../../../screens/statistics/StatisticsViewModel'
import { currencyFormat } from '../../../../utils/NumberFormat'
import usePieChartViewModel, { PIE_CHART_MODE } from './PieChartViewModel'
import CustomPieChart from '../CustomPieChart'
import { Styles } from '../../../styles/Styles'



// ------------------- PieChartComponent ------------------- //
type PieChartProps = {
    data: PieChartItem[],
}

const PieChartComponent = ({ data }: PieChartProps) => {

    const {
        currentMode,
        changeMode
    } = usePieChartViewModel()


    return (

        <View>

            <ChartSwitch
                changeMode={changeMode}
                currentMode={currentMode}
            />

            <CustomPieChart
                data={data}
                size={Styles.WIDTH * 0.5}
            />

            <ChartList
                data={data}
                currentMode={currentMode}
            />

        </View>
    )

}


// ------------------- ChartList ------------------- //
type ChartListProps = {
    data: PieChartItem[],
    currentMode: string
}

const ChartList = ({
    data,
    currentMode
}: ChartListProps) => {

    return (
        <View style={PieChartStyles.legendContainer}>
            {data.map((item, index) => (
                <ChartLegend
                    key={index}
                    currentMode={currentMode}
                    {...item}
                />
            ))}
        </View>
    )

}


// ------------------- ChartLegend ------------------- //
type ChartLegendProps = PieChartItem & {
    currentMode: string
}

const ChartLegend = ({ name, color, percentage, amount, currentMode }: ChartLegendProps) => {

    return (
        <View style={PieChartStyles.legentItem}>

            <Label
                value={name}
                style={PieChartStyles.legendLabel}
            />

            {
                currentMode === PIE_CHART_MODE.percentage ?
                    <Label
                        value={`${percentage}%`}
                        style={PieChartStyles.numberLabel}
                    />
                    :
                    <Label
                        value={`$${currencyFormat(amount)}`}
                        style={PieChartStyles.numberLabel}
                    />
            }


            <View style={{
                backgroundColor: color,
                ...PieChartStyles.legendIcon
            }} />

        </View>
    )

}


// ------------------- ChartSwitch ------------------- // 
type ChartSwitchProps = {
    currentMode: string,
    changeMode: () => void
}

const ChartSwitch = ({ currentMode, changeMode }: ChartSwitchProps) => {

    return (
        <View style={PieChartStyles.ChartSwitchContainer}>

            <Label
                value={"Cambiar modo"}
                style={PieChartStyles.switchLabel}
            />

            <Switch
                trackColor={{ false: Colors.DARK_GRAY, true: Colors.DARK_GRAY }}
                thumbColor={Colors.WHITE}
                onValueChange={changeMode}
                value={currentMode === PIE_CHART_MODE.percentage}
            />
        </View>
    )

}


const PieChartStyles = StyleSheet.create({
    title: {
        fontFamily: FontFamily.BOLD,
        fontSize: FontSize.SMALL
    },
    switchLabel: {
        fontFamily: FontFamily.BOLD,
        fontSize: FontSize.XXSMALL
    },
    legendLabel: {
        fontFamily: FontFamily.BOLD,
        fontSize: FontSize.XXSMALL,
        marginRight: "2%"
    },
    numberLabel: {
        fontFamily: FontFamily.BOLD,
        fontSize: FontSize.XXSMALL
    },
    legendIcon: {
        width: 15,
        aspectRatio: 1,
        borderRadius: 50,
        marginLeft: 5,
    },
    legendContainer: {
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
    },
    legentItem: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
    },
    ChartSwitchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    }

})

export default PieChartComponent