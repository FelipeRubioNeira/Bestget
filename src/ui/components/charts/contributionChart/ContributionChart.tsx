import { View } from 'react-native'
import React from 'react'
import { ContributionChartValue, ContributionData } from '../../../screens/statistics/StatisticsViewModel'
import { ContributionGraph } from 'react-native-chart-kit'
import { Styles } from '../../../styles/Styles'
import ColorsApp from '../../../../utils/Colors'
import { Colors } from '../../../constants/Colors'
import { FontFamily, FontSize } from '../../../constants/Fonts'
import Label from '../../label/Label'
import useContributionChartViewModel from './ContributionChartViewModel'
import Modal from '../../modal/Modal'
import useModalViewModel from '../../modal/ModalViewModel'


type DistributionChartProps = {
    data: ContributionData
}


const ContributionChart = ({ data }: DistributionChartProps) => {


    // ------------------ extract data ------------------ //
    const { month, endDate, values } = data


    // ------------------ hooks ------------------ //
    const {
        showModal,
        hideModal,
        modalState
    } = useModalViewModel()

    const {
        handlePress
    } = useContributionChartViewModel({
        showModal,
        hideModal
    })


    // ------------------ render ------------------ //
    if (month === "") return
    return (

        <>
            <View>

                <Label
                    value={month}
                    fontSize={FontSize.XSMALL}
                    fontFamily={FontFamily.BOLD}
                />

                <ContributionGraph
                    values={values}
                    numDays={values.length}
                    endDate={new Date(endDate)}
                    onDayPress={day => handlePress(day as ContributionChartValue)}
                    getMonthLabel={() => ""}
                    squareSize={50}
                    tooltipDataAttrs={() => { return {} }}
                    height={420}
                    width={Styles.WIDTH * 0.9}
                    chartConfig={{
                        backgroundGradientFrom: ColorsApp.hexToRGB(Colors.GRAY),
                        backgroundGradientTo: ColorsApp.hexToRGB(Colors.GRAY),
                        color: (opacity = 0.2) => `rgba(241, 121, 121 , ${opacity})`,
                        labelColor: () => ColorsApp.hexToRGB(Colors.RED),
                    }}
                />

            </View>


            <Modal
                visible={modalState.visible}
                title={modalState.title}
                message={modalState.message}
                buttonList={modalState.buttonList}
            />


        </>
    )
}

export default ContributionChart
