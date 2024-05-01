import { useEffect, useState } from "react"
import { BudgetsCreateScreenProps } from "../../../navigation/NavigationParamList"
import { Category } from "../../../data/types/Categoty"
import CreateBudgetUseCase from "../../../domain/useCases/CreateBudgetUseCase"
import { Budget, BudgetCreate } from "../../../data/types/Budget"
import { currencyFormat, numberFormat } from "../../../utils/NumberFormat"
import { ScreenRoutes } from "../../../navigation/Routes"
import { ModalButtonList, ModalProps } from "../../components/modal/Modal"
import DefaultStyles from "../../styles/DefaultStyles"
import EditBudgetUseCase from "../../../domain/useCases/EditBudgetUseCase"
import ExpenseRepository from "../../../data/repository/expenseRepository/ExpenseRepository"
import { Expense } from "../../../data/types/Expense"
import DateTime from "../../../utils/DateTime"
import { useGlobalContext } from "../../../data/globalContext/GlobalContext"
import { useEventBus } from "../../../data/globalContext/events/EventBus"



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
    const { 
        categoriesContext,
     } = useGlobalContext()



    // ------------------- params ------------------- //
    const {
        budget,
    } = route.params || {}


    // ------------------- hooks ------------------- //
    const {emmitEvent} = useEventBus()



    // ------------------- states ------------------- //
    const [expenses, setExpenses] = useState<Expense[]>([])

    const [budgetState, setBudgetState] = useState<BudgetState>({
        budgetName: "",
        budgetAmount: "",
        categoryId: 0,
        budgetDate: dateTime.convertToNormalDate(dateTime.date)
    })

    const [modalState, setModalState] = useState<ModalProps>({
        visible: false,
        title: "",
        message: "",
        buttonList: []
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
        const expenses = await expensesRepository.getByBudgetId(budget.id)
        setExpenses(expenses)
    }


    // ------------------- modal ------------------- //
    const showModal = (title: string, message: string, buttonList: ModalButtonList[]) => {

        setModalState({
            visible: true,
            title: title,
            message: message,
            buttonList: buttonList
        })
    }

    const hideModal = () => {
        setModalState({ ...modalState, visible: false })
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
                            onPress: () => updateBudget(),
                        },
                        {
                            text: "Cancelar",
                            onPress: () => setModalState({ ...modalState, visible: false }),
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

        const budgetEditted = {
            id: budget?.id || "",
            name: budgetState.budgetName,
            amount: numberFormat(budgetState.budgetAmount),
            categoryId: budgetState?.categoryId || 0,
            date: date
        }


        const response = await editBudgetUseCase.execute(budgetEditted, expenses, emmitEvent)


        if (response.isValid) {
            navigation.navigate(ScreenRoutes.BUDGET_EXPENSES, {
                newBudgetId: response.result?.id
            })

        } else {

            showModal(
                response.message.title,
                response.message.message,
                [
                    {
                        text: "Continuar",
                        onPress: () => setModalState({ ...modalState, visible: false }),
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

    const createBudget = async () => {

        const date = dateTime.getIsoDateTime(budgetState.budgetDate)

        // 1- create budget
        const budgetCreate: BudgetCreate = {
            name: budgetState.budgetName,
            amount: numberFormat(budgetState.budgetAmount),
            categoryId: budgetState.categoryId,
            date: date
        }

        // 2- upload budget and budget expenses
        const {isValid, result, message} = await createBudgetUseCase.createBudget(budgetCreate, emmitEvent)


        if (isValid && result) {
            navigation.replace(ScreenRoutes.BUDGET, {
                budget: result,
            })

        } else {

           showModal(
                message.title,
                message.message,
                [
                    {
                        text: "Continuar",
                        onPress: () => setModalState({ ...modalState, visible: false }),
                    },
                ]
           )
        }

    }

    // ------------------- return ------------------- //
    return {
        modalState,
        categories: categoriesContext,
        budgetState,
        updateBudgetName,
        updateBudgetAmount,
        updateCategory,
        updateBudgetDate,
        onSubmit

    }


}

export default useBudgetsFormViewModel