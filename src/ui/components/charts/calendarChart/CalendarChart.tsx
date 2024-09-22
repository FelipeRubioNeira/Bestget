import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDay } from 'date-fns';
import { FontFamily, FontSize } from '../../../constants/Fonts';
import useCalendarChartViewModel from './CalendarChartViewModel';
import { ContributionChartValue, ContributionData } from '../../../screens/statistics/StatisticsViewModel';
import ColorsApp from '../../../../utils/Colors';
import { Colors } from '../../../constants/Colors';
import Label from '../../label/Label';
import { Styles } from '../../../styles/Styles';
import Modal from '../../modal/Modal';
import useModalViewModel from '../../modal/ModalViewModel';


type CalendarProps = {
    date: string,
    data: ContributionData,
}


const CalendarChart = ({ data, date }: CalendarProps) => {


    // ------------------- view models ------------------- //
    const {
        showModal,
        modalState
    } = useModalViewModel()


    const {
        startDate,
        daysOfWeek,
        getNumberDay,
        handleOnPress
    } = useCalendarChartViewModel({ date, showModal });





    // ------------------- functions ------------------- //
    const renderDays = () => {
        const startDay = getDay(startDate);
        const emptyDays = generateEmptyDays(startDay);
        const totalExpenses = getMaxExpenses(data.values);

        return fillDays(emptyDays, data.values, totalExpenses);
    };

    const getMaxExpenses = (values: ContributionChartValue[]) => {

        let max = 0;

        values.forEach(value => {
            if (value.count > max) {
                max = value.count;
            }
        });

        return max;

    }

    const generateEmptyDays = (startDay: number) => {

        const days = [];

        for (let i = 0; i < startDay; i++) {
            days.push(<EmptyDay key={`empty-${i}`} />);
        }

        return days;

    }

    const fillDays = (
        emptyDays: JSX.Element[],
        daysInMonth: ContributionChartValue[],
        totalExpenses: number
    ) => {


        return emptyDays.concat(
            daysInMonth.map(({ date, count, expenseList }, index) => {
                const day = getNumberDay(date.toString())
                const color = generateColor(count, totalExpenses);

                return (
                    <IndividualDay
                        key={index}
                        day={day}
                        color={color}
                        onPress={() => {
                            handleOnPress({ date, count, expenseList })
                        }}
                    />
                )
            })
        );
    }

    const generateColor = (count: number, totalExpenses: number) => {

        const opacityColor = count / totalExpenses;
        return ColorsApp.hexToRGB(Colors.CHIP_DEBTS, opacityColor);

        // const ratio = count / totalExpenses;
        // let color;

        // if (ratio < 0.2) {
        //     color = ColorsApp.hexToRGB('#ADD8E6', ratio); // Light Blue

        // } else if (ratio < 0.4) {
        //     color = ColorsApp.hexToRGB('#90EE90', ratio); // Light Green

        // } else if (ratio < 0.6) {
        //     color = ColorsApp.hexToRGB('#FFFF00', ratio); // Yellow

        // } else if (ratio < 0.8) {
        //     color = ColorsApp.hexToRGB('#FFA500', ratio); // Orange

        // } else {
        //     color = ColorsApp.hexToRGB('#FF0000', ratio); // Red
        // }

        // return color;
    }

    const renderDaysOfWeek = (daysOfWeek: string[]) => {
        return daysOfWeek.map((day, index) => (
            <Label
                key={index}
                value={day}
                fontSize={FontSize.XSMALL}
                fontFamily={FontFamily.BOLD}
            />
        ));
    };


    // ------------------- render ------------------- //
    return (
        <View style={CalendarStyles.container}>

            <View style={CalendarStyles.daysOfWeekContainer}>{renderDaysOfWeek(daysOfWeek)}</View>
            <View style={CalendarStyles.daysContainer}>{renderDays()}</View>

            <Modal
                visible={modalState.visible}
                title={modalState.title}
                message={modalState.message}
                buttonList={modalState.buttonList}
                backgroundStyle={{backgroundColor:"trasparent"}}
            />

        </View>
    );
};


// ------------------- IndividualDay ------------------- //
interface IndividualDayProps {
    day: number;
    color?: string;
    onPress: () => void;
}

const IndividualDay = ({ day, onPress, color }: IndividualDayProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: color,
                ...CalendarStyles.dayCell,
            }}
        >
            <View style={CalendarStyles.dayContainer}>
                <Label
                    value={day.toString()}
                    fontSize={FontSize.XSMALL}
                />
            </View>

        </TouchableOpacity>
    );
}


// ------------------- EmptyDay ------------------- //
const EmptyDay = () => <View style={CalendarStyles.dayCell} />



// ------------------- Styles ------------------- //
const CalendarStyles = StyleSheet.create({
    container: {
        padding: 16,
    },
    daysOfWeekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayOfWeek: {
        flex: 1,
        textAlign: 'center',
        fontFamily: FontFamily.BOLD
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Styles.BORDER_RADIUS
    },
    dayContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dayText: {
        fontSize: 16,
        fontFamily: FontFamily.LIGHT,
    },
});

export default CalendarChart
