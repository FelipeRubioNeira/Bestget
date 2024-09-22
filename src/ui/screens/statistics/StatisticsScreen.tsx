import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native'
import useStatisticsViewModel from './StatisticsViewModel';
import BarChartComponent from '../../components/charts/BarChartComponent';
import PieChartComponent from '../../components/charts/pieChart/PieChartComponent';
import WithFrameChart from '../../components/charts/WithFrameChart';
import Spacer from '../../components/spacer/Spacer';
import { Styles } from '../../styles/Styles';
import CalendarChart from '../../components/charts/calendarChart/CalendarChart';
import { useAppSelector } from '../../../data/globalContext/StoreHooks';
import { selectDateIntervalApp } from '../../../data/globalContext/redux/slices/DateIntervalAppSlice';



// ------------------- StatisticsScreen ------------------- //
const FramedBarChart = WithFrameChart(BarChartComponent);
const FramedPieChart = WithFrameChart(PieChartComponent);
const FramendCalendarChart = WithFrameChart(CalendarChart);


const StatisticsScreen = () => {


    // ------------------- context ------------------- //
    const {
        initialDate
    } = useAppSelector(selectDateIntervalApp)

    // ------------------- view models ------------------- //
    const {
        barChartData,
        pieChartData,
        contributionData
    } = useStatisticsViewModel()



    return (

        <SafeAreaView>
            <ScrollView>

                <Spacer marginVertical={Styles.MARGIN} />

                <FramedBarChart
                    title='Ingresos vs Gastos'
                    data={barChartData}
                />

                <Spacer marginVertical={Styles.MARGIN} />

                <FramedPieChart
                    title='Distribución de gastos'
                    data={pieChartData}
                    size={Styles.WIDTH * 0.7}
                />

                <Spacer marginVertical={Styles.MARGIN} />


                <FramendCalendarChart
                    title='Mapa de calor'
                    date={initialDate}
                    data={contributionData}
                />

                <Spacer marginVertical={Styles.MARGIN} />


            </ScrollView>
        </SafeAreaView>
    )
}

export default StatisticsScreen


