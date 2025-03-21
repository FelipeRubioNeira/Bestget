import { useEffect, useState } from "react"
import { BudgetsCreateScreenProps } from "../../../navigation/NavigationParamList"
import CreateBudgetUseCase from "../../../domain/useCases/CreateBudgetUseCase"
import { Budget } from "../../../data/types/Budget"
import { currencyFormat, numberFormat } from "../../../utils/NumberFormat"
import { ScreenRoutes } from "../../../navigation/Routes"
import useModalViewModel from "../../components/modal/ModalViewModel"
import DefaultStyles from "../../styles/DefaultStyles"
import EditBudgetUseCase from "../../../domain/useCases/EditBudgetUseCase"
import ExpenseRepository from "../../../data/repository/expenseRepository/ExpenseRepository"
import { Expense } from "../../../data/types/Expense"
import DateTime from "../../../utils/DateTime"
import { useEventBus } from "../../../data/globalContext/events/EventBus"
import { selectUserApp } from "../../../data/globalContext/redux/slices/UserAppSlice"
import { useAppSelector } from "../../../data/globalContext/StoreHooks"
import { selectFinancesApp } from "../../../data/globalContext/redux/slices/FinancesAppSlice"
import { selectDateIntervalApp } from "../../../data/globalContext/redux/slices/DateIntervalAppSlice"
import { getFinanceType } from "../../../data/types/FinanceType"


const dateTime = new DateTime()


type IBudgetCreateViewModel = {
    createBudgetUseCase: CreateBudgetUseCase,
    editBudgetUseCase: EditBudgetUseCase,
    expensesRepository: ExpenseRepository
} & BudgetsCreateScreenProps


interface BudgetState {
    budgetName: string,
    budgetAmount: string,
    budgetDate: string
    categoryId: number,
}

type StateName = keyof BudgetState
type StateType = BudgetState[StateName]


const useBudgetsFormViewModel = ({
    route,
    navigation,
    createBudgetUseCase,
    editBudgetUseCase,
    expensesRepository
}: IBudgetCreateViewModel) => {


    // ------------------- context ------------------- //
    const userApp = useAppSelector(selectUserApp)
    const { categories, groupId } = useAppSelector(selectFinancesApp)
    const dateInterval = useAppSelector(selectDateIntervalApp)


    // ------------------- params ------------------- //
    const { budget } = route.params || {}


    // ------------------- hooks ------------------- //
    const { emmitEvent } = useEventBus()
    const { showModal, hideModal, modalState } = useModalViewModel()



    // ------------------- states ------------------- //
    const [expenses, setExpenses] = useState<Expense[]>([])

    const [budgetState, setBudgetState] = useState<BudgetState>({
        budgetName: "",
        budgetAmount: "",
        categoryId: 0,
        budgetDate: dateTime.mergeDate(dateTime.date, dateInterval.initialDate)
    })




    // ------------------- effects ------------------- //
    useEffect(() => {
        if (budget) {
            updateForm(budget)
            getExpenses(budget)
        }
    }, [budget])


    // ------------------- methods ------------------- //


    // ------------------- update form ------------------- //
    const updateForm = (budget: Budget) => {

        setBudgetState({
            budgetName: budget.name,
            budgetAmount: currencyFormat(budget.amount),
            categoryId: budget?.categoryId || 0,
            budgetDate: budget.date
        })

    }

    const updateBudgetState = (state: StateName, value: StateType) => {
        setBudgetState({
            ...budgetState,
            [state]: value
        })
    }

    const updateBudgetName = (newBudgetName: string) => {
        updateBudgetState("budgetName", newBudgetName)
    }

    const updateBudgetAmount = (newBudgetAmount: string) => {
        updateBudgetState("budgetAmount", newBudgetAmount)
    }

    const updateCategory = (categoryId: number) => {
        updateBudgetState("categoryId", categoryId)
    }

    const updateBudgetDate = (newDate: string) => {
        updateBudgetState("budgetDate", newDate)
    }

    // ------------------- expenses ------------------- //
    const getExpenses = async (budget: Budget) => {
        const expenses = await expensesRepository.getByBudgetId(budget.budgetId)
        setExpenses(expenses)
    }


    const onSubmit = async () => {

        // if budget exists, update budget
        if (budget) {

            // if category changes, show modal
            if (hasCategoryChanged() && hasExpenses()) {

                showModal(
                    "Cambio de categoría",
                    "Si cambias la categoría todos los gastos asociados a este presupuesto tambien se actualizarán. ¿Deseas continuar?",
                    [
                        {
                            text: "Continuar",
                            onPress: updateBudget,
                        },
                        {
                            text: "Cancelar",
                            onPress: hideModal,
                            style: DefaultStyles.mainButton
                        },
                    ]
                )

                // if category doesn't change, update budget
            } else updateBudget()

            // if budget doesn't exist, create budget
        } else createBudget()

    }


    const updateBudget = async () => {

        hideModal()

        const date = dateTime.getIsoDateTime(budgetState.budgetDate)

        const budgetEdited: Budget = {
            financeType: getFinanceType(groupId),
            groupId: groupId,
            budgetId: budget?.budgetId || "",
            userId: budget?.userId || "",
            name: budgetState.budgetName,
            amount: numberFormat(budgetState.budgetAmount),
            categoryId: budgetState?.categoryId || 0,
            date: date,
            remaining: budget?.remaining || 0
        }


        const response = await editBudgetUseCase.execute(budgetEdited, expenses, emmitEvent)


        if (response.isValid) {
            navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, {
                newBudgetId: response.result?.budgetId
            })

        } else {

            showModal(
                "Error",
                response.message,
                [
                    {
                        text: "Continuar",
                        onPress: hideModal,
                    },
                ]

            )
        }

    }

    const createBudget = async () => {

        const date = dateTime.getIsoDateTime(budgetState.budgetDate)

        // 1- create budget
        const budgetCreate: Budget = {
            financeType: getFinanceType(groupId),
            budgetId: "",
            remaining: 0,
            groupId: groupId,
            userId: userApp.userId,
            name: budgetState.budgetName,
            amount: numberFormat(budgetState.budgetAmount),
            categoryId: budgetState.categoryId,
            date: date
        }

        // 2- upload budget and budget expenses
        const { isValid, result, message } = await createBudgetUseCase.createBudget(
            budgetCreate,
            emmitEvent
        )


        if (isValid && result) {
            navigation.replace(ScreenRoutes.BUDGET, {
                budget: result,
            })

        } else {

            showModal(
                "Error",
                message,
                [
                    {
                        text: "Continuar",
                        onPress: hideModal,
                    },
                ]
            )
        }

    }

    // currect category is different from the category in the budget
    const hasCategoryChanged = () => {
        return budget?.categoryId !== budgetState.categoryId
    }

    const hasExpenses = () => {
        return expenses.length > 0
    }

    // ------------------- return ------------------- //
    return {
        modalState,
        categories,
        budgetState,
        updateBudgetName,
        updateBudgetAmount,
        updateCategory,
        updateBudgetDate,
        onSubmit

    }


}

export default useBudgetsFormViewModel