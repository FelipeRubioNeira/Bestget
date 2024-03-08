import { Image, ImageProps, SafeAreaView, StyleProp, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import React from 'react'
import { DefaultStyles, Styles } from '../../constants/Styles'
import HelpText from '../../components/helpText/Help'
import { Strings } from '../incomes/Strings'
import { FontFamily, FontSize } from '../../constants/Fonts'
import { Colors } from '../../constants/Colors'
import TotalAmount from '../../components/totalAmount/TotalAmount'
import useOutcomesViewModel from './OutcomesViewModel'
import { OutcomesScreenProps } from '../../navigation/NavigationParamList'
import Label from '../../components/Label'
import ButtonAdd from '../../components/buttonAdd/ButtonAdd'

interface OutComeFormatted {
    name: string,
    amount: string,
    date: string
}

interface OutcomeOptionsProps {
    visible: boolean,
    onPressOutcome: () => void,
    onPressBudget: () => void,
    onHideOptions: () => void
}

interface OutcomeOptionItemProps {
    title: string,
    image: ImageProps,
    styles: ViewStyle,
    onPress: () => void
}

const OutcomesScreen = ({ navigation, route }: OutcomesScreenProps) => {

    const outcomesViewModel = useOutcomesViewModel({
        navigation,
        route
    })

    return (

        <View style={DefaultStyles.SCREEN}>

            <HelpText
                value={Strings.outcomes}
                fontSize={FontSize.XSMALL}
                color={Colors.DARK_GRAY}
            />

            <TotalAmount
                label="Gasto"
                amount={outcomesViewModel?.totalAmount}
                color={Colors.YELLOW}
            />

            <OutcomeItem
                name="Comida"
                amount="100"
                date="10/10/2021"
            />

            <ButtonAdd
                visible={outcomesViewModel.buttonAddVisible}
                backgroundColor={Colors.YELLOW}
                onPress={outcomesViewModel.onShowOutcomeOptions}
            />

            <OutcomeOptions
                visible={outcomesViewModel.outcomeOptionsVisible}
                onPressOutcome={outcomesViewModel.onAddOutcome}
                onPressBudget={outcomesViewModel.onAddBudget}
                onHideOptions={outcomesViewModel.onHideOutcomeOptions}
            />

        </View>


    )
}



const OutcomeItem = ({ name, amount }: OutComeFormatted) => {

    return (
        <TouchableOpacity style={outcomes_styles.outcomeItem}>

            <Label
                value={name}
                fontSize={FontSize.SMALL}
                fontFamily={FontFamily.REGULAR}
            />

            <Label
                value={"$" + amount}
                fontSize={FontSize.SMALL}
                fontFamily={FontFamily.REGULAR}
            />

        </TouchableOpacity>
    )
}

const OutcomeOptions = ({
    visible,
    onPressOutcome,
    onPressBudget,
    onHideOptions
}: OutcomeOptionsProps) => {

    return (
        <TouchableWithoutFeedback
            onPress={onHideOptions}
        >

            <View style={{
                ...outcomes_styles.outcome_options,
                display: visible ? 'flex' : 'none',
            }}>

                <OutcomeOptionItem
                    title='Gasto'
                    onPress={onPressOutcome}
                    image={require("../../../assets/icons/ic_salary.png")}
                    styles={{
                        backgroundColor: Colors.YELLOW,
                        right: 0,
                        top: 0,
                    }}
                />

                <OutcomeOptionItem
                    title='Plan'
                    onPress={onPressBudget}
                    image={require("../../../assets/icons/ic_budget.png")}
                    styles={{
                        backgroundColor: Colors.YELLOW,
                        bottom: 0,
                        left: 0,
                    }}
                />
            </View>

        </TouchableWithoutFeedback>
    )
}

const OutcomeOptionItem = ({
    title,
    image,
    styles,
    onPress
}: OutcomeOptionItemProps) => {

    return (
        <View style={{ ...outcomes_styles.touchable_option_item, ...styles }}>

            <Label value={title} fontSize={FontSize.XXSMALL} />

            <TouchableOpacity onPress={onPress}>
                <Image
                    source={image}
                    resizeMode='center'
                    style={outcomes_styles.image_option_item}
                />
            </TouchableOpacity>
        </View>
    )

}

export default OutcomesScreen

const outcomes_styles = StyleSheet.create({

    outcome_options: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        height: 170,
        aspectRatio: 1,
    },

    outcomeItem: {
        width: "100%",
        height: 60,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        borderColor: Colors.GRAY,
        borderRadius: Styles.BORDER_RADIUS,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    touchable_option_item: {
        position: 'absolute',
        height: 80,
        aspectRatio: 1,
        borderRadius: Styles.HEIGHT,
        justifyContent: 'space-between',
        paddingVertical: "8%",
        alignItems: 'center',
        ...DefaultStyles.SHADOW,
    },

    image_option_item: {
        height: "80%",
        aspectRatio: 1,
        alignSelf: 'center',
    }
})