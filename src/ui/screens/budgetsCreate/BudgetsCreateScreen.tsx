import { StyleSheet, View } from 'react-native'
import React from 'react'
import { DefaultStyles } from '../../constants/Styles'
import TextInputWithLabel from '../../components/textInputWithLabel/TextInputWithLabel'
import Spacer from '../../components/spacer/Spacer'
import { InputType } from '../../components/textInput/TextInputViewModel'
import ChipList from '../../components/chipList/ChipList'
import SubmitButton from '../../components/submitButton/SubmitButton'
import { Colors } from '../../constants/Colors'
import { BudgetsCreateScreenProps } from '../../../navigation/NavigationParamList'
import useBudgetsCreateViewModel from './BudgetsCreateViewModel'
import CreateBudgetUseCase from '../../../domain/useCases/CreateBudgetUseCase'
import BudgetRepository from '../../../data/repository/budgetRepository/BudgetRepository'


const budgetRepository = new BudgetRepository()
const createBudgetUseCase = new CreateBudgetUseCase(budgetRepository)

const BudgetsCreateScreen = ({ navigation, route }: BudgetsCreateScreenProps) => {


    const budgetsCreateViewModel = useBudgetsCreateViewModel({
        navigation,
        route,
        createBudgetUseCase
    })

    const {
        budgetName,
        budgetAmount,
    } = budgetsCreateViewModel.budgetState

    return (
        <View style={{ ...DefaultStyles.SCREEN, justifyContent: "space-between" }}>

            <View>

                <TextInputWithLabel
                    value={budgetName}
                    onChangeText={budgetsCreateViewModel.updateBudgetName}
                    title="Nombre presupuesto:"
                    placeholder="Salidas de fin de semana"
                />

                <Spacer marginVertical={"4%"} />

                <TextInputWithLabel
                    value={budgetAmount}
                    onChangeText={budgetsCreateViewModel.updateBudgetAmount}
                    title="Presupuesto:"
                    placeholder="$120.000"
                    inputMode={InputType.NUMERIC}
                />

                <ChipList
                    onPress={budgetsCreateViewModel.updateCategory}
                    categories={budgetsCreateViewModel.categories}
                />

            </View>

            <Spacer marginVertical={"8%"} />


            <SubmitButton
                backgroundColor={Colors.YELLOW}
                onPress={budgetsCreateViewModel.onSubmit}
            />

        </View>
    )
}


export default BudgetsCreateScreen