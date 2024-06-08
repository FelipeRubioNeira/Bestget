import { SafeAreaView, ScrollView, View } from 'react-native'
import useStatisticsViewModel from './StatisticsViewModel';
import BarChartComponent from '../../components/charts/BarChartComponent';
import PieChartComponent from '../../components/charts/PieChartComponent';
import WithFrameChart from '../../components/charts/WithFrameChart';
import Spacer from '../../components/spacer/Spacer';
import { Styles } from '../../styles/Styles';


// ------------------- StatisticsScreen ------------------- //
const FramedPieChart = WithFrameChart(PieChartComponent);
const FramedBarChart = WithFrameChart(BarChartComponent);



const StatisticsScreen = () => {

    const {
        pieChartData,
        barChartData
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
                />

                <Spacer marginVertical={Styles.MARGIN} />

            </ScrollView>
        </SafeAreaView>
    )
}

export default StatisticsScreen


