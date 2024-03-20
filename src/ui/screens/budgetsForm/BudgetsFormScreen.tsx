import { View } from 'react-native'
import React from 'react'
import TextInputWithLabel from '../../components/textInputWithLabel/TextInputWithLabel'
import Spacer from '../../components/spacer/Spacer'
import { InputType } from '../../components/textInput/TextInputViewModel'
import ChipList from '../../components/chipList/ChipList'
import SubmitButton from '../../components/submitButton/SubmitButton'
import { Colors } from '../../constants/Colors'
import { BudgetsCreateScreenProps } from '../../../navigation/NavigationParamList'
import useBudgetsFormViewModel from './BudgetsFormViewModel'
import CreateBudgetUseCase from '../../../domain/useCases/CreateBudgetUseCase'
import BudgetRepository from '../../../data/repository/budgetRepository/BudgetRepository'
import Screen from '../../components/screen/Screen'
import Modal from '../../components/modal/Modal'
import EditBudgetUseCase from '../../../domain/useCases/EditBudgetUseCase'
import ExpenseRepository from '../../../data/repository/expenseRepository/ExpenseRepository'


const budgetRepository = new BudgetRepository()
const expensesRepository = new ExpenseRepository()

const createBudgetUseCase = new CreateBudgetUseCase(budgetRepository)

const editBudgetUseCase = new EditBudgetUseCase(
    budgetRepository,
    expensesRepository
)


const BudgetsFormScreen = ({ navigation, route }: BudgetsCreateScreenProps) => {


    const budgetsCreateViewModel = useBudgetsFormViewModel({
        navigation,
        route,
        createBudgetUseCase,
        editBudgetUseCase,
        expensesRepository
    })

    const {
        budgetState,
        modalState,
        updateBudgetName,
        updateBudgetAmount,
        updateCategory,
        categories,
        onSubmit
    } = budgetsCreateViewModel


    return (
        <Screen>
            <View>

                <TextInputWithLabel
                    value={budgetState.budgetName}
                    onChangeText={updateBudgetName}
                    title="Nombre presupuesto:"
                    placeholder="Salidas de fin de semana"
                />

                <Spacer marginVertical={"4%"} />

                <TextInputWithLabel
                    value={budgetState.budgetAmount}
                    onChangeText={updateBudgetAmount}
                    title="Presupuesto:"
                    placeholder="$120.000"
                    inputMode={InputType.NUMERIC}
                />

                <ChipList
                    idSelected={budgetState.categoryId}
                    onPress={updateCategory}
                    categories={categories}
                />

            </View>

            <Spacer marginVertical={"8%"} />

            <SubmitButton
                backgroundColor={Colors.YELLOW}
                onPress={onSubmit}
            />

            <Modal
                visible={modalState.visible}
                title={modalState.title}
                message={modalState.message}
                buttonList={modalState.buttonList}
            />

        </Screen>
    )
}


export default BudgetsFormScreen