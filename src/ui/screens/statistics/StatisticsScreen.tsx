import { SafeAreaView, ScrollView, View } from 'react-native'
import useStatisticsViewModel from './StatisticsViewModel';
import BarChartComponent from '../../components/charts/BarChartComponent';
import PieChartComponent from '../../components/charts/pieChart/PieChartComponent';
import WithFrameChart from '../../components/charts/WithFrameChart';
import Spacer from '../../components/spacer/Spacer';
import { Styles } from '../../styles/Styles';
import ContributionChart from '../../components/charts/contributionChart/ContributionChart';
import CustomPieChart from '../../components/charts/CustomPieChart';


// ------------------- StatisticsScreen ------------------- //
const FramedBarChart = WithFrameChart(BarChartComponent);
const FramedPieChart = WithFrameChart(PieChartComponent);
const FramedDistributionChart = WithFrameChart(ContributionChart);


const StatisticsScreen = () => {

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
                    
                />

                <Spacer marginVertical={Styles.MARGIN} />

                <FramedDistributionChart
                    title='Contribución de gastos por día'
                    data={contributionData}
                />

                <Spacer marginVertical={Styles.MARGIN} />

            </ScrollView>
        </SafeAreaView>
    )
}

export default StatisticsScreen


