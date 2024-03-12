import { FlatList, Image, ImageProps, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import React from 'react'
import { DefaultStyles, Styles } from '../../constants/Styles'
import HelpText from '../../components/helpText/Help'
import { Strings } from '../incomes/Strings'
import { FontSize } from '../../constants/Fonts'
import { Colors } from '../../constants/Colors'
import TotalAmount from '../../components/totalAmount/TotalAmount'
import { BudgetsExpensesScreenProps } from '../../navigation/NavigationParamList'
import Label from '../../components/label/Label'
import ButtonAdd from '../../components/buttonAdd/ButtonAdd'
import ExpenseRepository from '../../../data/repository/expenseRepository/ExpenseRepository'
import CategoryRespository from '../../../data/repository/categoryRepository/CategoryRepository'
import Loading from '../../components/loading/Loading'
import BudgetRepository from '../../../data/repository/budgetRepository/BudgetRepository'
import useBudgetExpensesViewModel from './BudgetsExpensesViewModel'
import { BudgetExpenseItem } from '../../../data/types/BudgetExpense'
import ExpenseItem from '../../components/expenseItem/ExpenseItem'
import BudgetItem from '../../components/budgetItem/BudgetItem'


interface ExpenseOptionsProps {
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


const expenseRepository = new ExpenseRepository()
const budgetRepository = new BudgetRepository()
const categoryRepository = new CategoryRespository()


const BudgetsExpensesScreen = ({ navigation, route }: BudgetsExpensesScreenProps) => {


    const budgetsExpensesViewModel = useBudgetExpensesViewModel({
        navigation,
        route,
        expenseRepository,
        budgetRepository,
        categoryRepository
    })

    const renderBugdetOrExpense = (item: BudgetExpenseItem) => {

        const { name, amount, category } = item

        if (item.type === "Expense") {

            return <ExpenseItem
                name={name}
                amount={amount}
                category={category}
            />

        } else {

            return <BudgetItem
                name={name}
                amount={amount}
                category={category}
            />
        }

    }

    return (
        <>
            <View style={DefaultStyles.SCREEN}>

                <HelpText
                    value={Strings.expenses}
                    fontSize={FontSize.XSMALL}
                    color={Colors.DARK_GRAY}
                />

                <TotalAmount
                    label="Gasto"
                    amount={budgetsExpensesViewModel?.totalAmount}
                    color={Colors.YELLOW}
                />

                <FlatList
                    data={budgetsExpensesViewModel.budgetsExpenses}
                    renderItem={({ item }) => renderBugdetOrExpense(item)}
                />

                <ButtonAdd
                    visible={budgetsExpensesViewModel.buttonAddVisible}
                    backgroundColor={Colors.YELLOW}
                    onPress={budgetsExpensesViewModel.onShowExpenseOptions}
                />

            </View>


            <ExpenseOptions
                visible={budgetsExpensesViewModel.ExpenseOptionsVisible}
                onPressOutcome={budgetsExpensesViewModel.onAddExpense}
                onPressBudget={budgetsExpensesViewModel.onAddBudget}
                onHideOptions={budgetsExpensesViewModel.onHideExpenseOptions}
            />


            <Loading visible={budgetsExpensesViewModel.loading} />

        </>

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

                <ExpenseOptionItem
                    title='Gasto'
                    onPress={onPressOutcome}
                    image={require("../../../assets/icons/ic_salary.png")}
                    styles={{
                        backgroundColor: Colors.YELLOW,
                        right: 0,
                        bottom: 100,
                    }}
                />

                <ExpenseOptionItem
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

const ExpenseOptionItem = ({
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
        ...DefaultStyles.SHADOW,
    },

    image_option_item: {
        height: "80%",
        aspectRatio: 1,
        alignSelf: 'center',
    }
})

export default BudgetsExpensesScreen
