import { SafeAreaView, View } from 'react-native'
import PieChartComponent from '../../components/charts/PieChartComponent';
import useStatisticsViewModel from './StatisticsViewModel';




const StatisticsScreen = () => {


    const { userData } = useStatisticsViewModel()


    return (

        <SafeAreaView>
            <View>

                <PieChartComponent
                    title='Distribución de ingresos'
                    data={userData}
                />

            </View>
        </SafeAreaView>
    )
}

export default StatisticsScreen


