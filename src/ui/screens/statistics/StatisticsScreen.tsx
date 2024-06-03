import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const screenWidth = Dimensions.get("window").width;


import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Colors } from '../../constants/Colors';
import { Styles } from '../../styles/Styles';

const data = [
    {
        name: "Escenciales",
        amount: 10000,
        color: Colors.CHIP_ESSENTIALS,
        legendFontColor: Colors.BLACK,
        legendFontSize: 15
    },
    {
        name: "Ahorro",
        amount: 2000,
        color: Colors.CHIP_SAVINGS,
        legendFontColor: Colors.BLACK,
        legendFontSize: 15
    },
    {
        name: "Lujos",
        amount: 4000,
        color: Colors.CHIP_LUXURIES,
        legendFontColor: Colors.BLACK,
        legendFontSize: 15
    },
    {
        name: "Deudas",
        amount: 3500,
        color: Colors.CHIP_DEBTS,
        legendFontColor: Colors.BLACK,
        legendFontSize: 15
    }
];

const StatisticsScreen = () => {
    return (
        <View style={{
            marginTop: 20,
            width: "95%",
            backgroundColor: Colors.GRAY,
            borderRadius: Styles.BORDER_RADIUS,
            marginHorizontal: 10,
        }}>
            <PieChart
                data={data}
                width={screenWidth}
                height={250}
                accessor={"amount"}
                backgroundColor={"transparent"}
                hasLegend={true}
                chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                paddingLeft={"0"}
                center={[10, 0]}
            />
        </View>
    )
}

export default StatisticsScreen

const styles = StyleSheet.create({})