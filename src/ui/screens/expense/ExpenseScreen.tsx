import { FlatList, Image, ImageProps, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import React from 'react'
import { Styles } from '../../styles/Styles'
import DefaultStyles from '../../styles/DefaultStyles'
import HelpText from '../../components/helpText/Help'
import { Strings } from '../../constants/Strings'
import { FontFamily, FontSize } from '../../constants/Fonts'
import { Colors } from '../../constants/Colors'
import TotalAmount from '../../components/totalAmount/TotalAmount'
import useExpensesViewModel from './ExpenseViewModel'
import { ExpenseScreenProps } from '../../../navigation/NavigationParamList'
import Label from '../../components/label/Label'
import ButtonAdd from '../../components/buttonAdd/ButtonAdd'
import ExpenseRepository from '../../../data/repository/expenseRepository/ExpenseRepository'
import CategoryRespository from '../../../data/repository/categoryRepository/CategoryRepository'
import { Category } from '../../../data/types/Categoty'
import ChipItem from '../../components/chipItem/ChipItem'
import Loading from '../../components/loading/Loading'
import BudgetRepository from '../../../data/repository/budgetRepository/BudgetRepository'

interface ExpenseItem {
    name: string,
    amount: string,
    category: Category | undefined,
}

interface ExpenseOptionsProps {
    visible: boolean,
    onPressOutcome: () => void,
    onPressBudget: () => void,
    onHideOptions: () => void
}

interface ExpenseOptionItemProps {
    title: string,
    image: ImageProps,
    styles: ViewStyle,
    onPress: () => void
}


const expenseRepository = new ExpenseRepository()
const budgetRepository = new BudgetRepository()
const categoryRepository = new CategoryRespository()


const ExpenseScreen = ({ navigation, route }: ExpenseScreenProps) => {


    const expensesViewModel = useExpensesViewModel({
        navigation,
        route,
        expenseRepository,
        budgetRepository,
        categoryRepository
    })

    return (

        <>
            <View style={DefaultStyles.screen}>

                <HelpText
                    value={Strings.expenses}
                    fontSize={FontSize.XSMALL}
                    color={Colors.DARK_GRAY}
                />

                <TotalAmount
                    label="Gasto"
                    amount={expensesViewModel?.totalAmount}
                    color={Colors.YELLOW}
                />

                <FlatList
                    data={expensesViewModel.expenses}
                    renderItem={({ item }) => (
                        <ExpenseItem
                            name={item.name}
                            amount={item.amount}
                            category={item.category}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />

                <ButtonAdd
                    visible={expensesViewModel.buttonAddVisible}
                    backgroundColor={Colors.YELLOW}
                    onPress={expensesViewModel.onShowExpenseOptions}
                />


            </View>

            <ExpenseOptions
                visible={expensesViewModel.ExpenseOptionsVisible}
                onPressOutcome={expensesViewModel.onAddExpense}
                onPressBudget={expensesViewModel.onAddBudget}
                onHideOptions={expensesViewModel.onHideExpenseOptions}
            />

            <Loading visible={expensesViewModel.loading} />

        </>

    )
}



const ExpenseItem = ({ name, amount, category }: ExpenseItem) => {


    return (

        <TouchableOpacity style={outcomes_styles.outcomeItem}>

            <View>

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

            </View>

            <ChipItem
                category={category as Category}
                disabled={true}
            />

        </TouchableOpacity>
    )
}

const ExpenseOptions = ({
    visible,
    onPressOutcome,
    onPressBudget,
    onHideOptions
}: ExpenseOptionsProps) => {

    if (!visible) return null
    return (

        <TouchableWithoutFeedback
            onPress={onHideOptions}>

            <View
                style={{
                    ...outcomes_styles.outcome_options,
                    display: visible ? 'flex' : 'none',
                }}
            >

                <OutcomeOptionItem
                    title='Gasto'
                    onPress={onPressOutcome}
                    image={require("../../../assets/icons/ic_salary.png")}
                    styles={{
                        backgroundColor: Colors.YELLOW,
                        right: 0,
                        bottom: 100,
                    }}
                />

                <OutcomeOptionItem
                    title='Plan'
                    onPress={onPressBudget}
                    image={require("../../../assets/icons/ic_budget.png")}
                    styles={{
                        backgroundColor: Colors.YELLOW,
                        bottom: 0,
                        right: 100,
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
}: ExpenseOptionItemProps) => {

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

export default ExpenseScreen

const outcomes_styles = StyleSheet.create({

    outcome_options: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        aspectRatio: 1,
        height: "100%",
        width: "100%",
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
        ...DefaultStyles.shadow,
    },

    image_option_item: {
        height: "80%",
        aspectRatio: 1,
        alignSelf: 'center',
    }
})