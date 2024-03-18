import { useEffect, useState } from "react"
import { BudgetsCreateScreenProps } from "../../../navigation/NavigationParamList"
import { Category } from "../../../data/types/Categoty"
import CreateBudgetUseCase from "../../../domain/useCases/CreateBudgetUseCase"
import { Budget, BudgetCreate } from "../../../data/types/Budget"
import { currencyFormat, numberFormat } from "../../../utils/Convert"
import { getCurrentDate } from "../../../utils/Date"
import { ScreenRoutes } from "../../../navigation/Routes"
import { ButtonModal, ModalProps } from "../../components/modal/Modal"
import { DefaultStyles } from "../../constants/Styles"
import EditBudgetUseCase from "../../../domain/useCases/EditBudgetUseCase"


type IBudgetCreateViewModel = {
    createBudgetUseCase: CreateBudgetUseCase,
    editBudgetUseCase: EditBudgetUseCase
} & BudgetsCreateScreenProps


interface BudgetState {
    budgetName: string,
    budgetAmount: string,
    categoryId: number
}

type StateName = keyof BudgetState
type StateType = BudgetState[StateName]


const useBudgetsFormViewModel = ({
    route,
    navigation,
    createBudgetUseCase,
    editBudgetUseCase
}: IBudgetCreateViewModel) => {


    // ------------------- params ------------------- //

    const {
        categoryList = [],
        budget
    } = route.params || {}

    // ------------------- states ------------------- //
    const [categories, setCategories] = useState<Category[]>([])

    const [budgetState, setBudgetState] = useState<BudgetState>({
        budgetName: "",
        budgetAmount: "",
        categoryId: 0
    })

    const [modalState, setModalState] = useState<ModalProps>({
        visible: false,
        title: "",
        message: "",
        buttonList: []
    })


    // ------------------- effects ------------------- //
    useEffect(() => {
        setCategories(categoryList)
    }, [categoryList])

    useEffect(() => {
        if (budget) updateForm(budget)
    }, [budget])


    // ------------------- methods ------------------- //


    // ------------------- update form ------------------- //
    const updateForm = (budget: Budget) => {

        setBudgetState({
            budgetName: budget.name,
            budgetAmount: currencyFormat(budget.amount),
            categoryId: budget?.categoryId || 0
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

    // ------------------- modal ------------------- //
    const showModal = (title: string, message: string, buttonList: ButtonModal[]) => {

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

            if (ifChangeCategory(budget?.categoryId, budgetState.categoryId)) {

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

            } else updateBudget()


            // if budget doesn't exist, create budget
        } else createBudget()

    }


    const updateBudget = async () => {

        hideModal()

        const budgetEditted = {
            id: budget?.id || "",
            name: budgetState.budgetName,
            amount: numberFormat(budgetState.budgetAmount),
            categoryId: budgetState?.categoryId || 0,
            date: getCurrentDate()
        }


        const response = await editBudgetUseCase.edit(budgetEditted)

        if (response.isValid) {
            navigation.replace(ScreenRoutes.BUDGET, {
                categoryList: categories,
                budget: budgetEditted
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

    const ifChangeCategory = (previousCategory: number = 0, currentCategory: number = 0) => {
        return previousCategory !== currentCategory
    }

    const createBudget = async () => {

        // 1- create budget
        const budgetCreate: BudgetCreate = {
            name: budgetState.budgetName,
            amount: numberFormat(budgetState.budgetAmount),
            categoryId: budgetState.categoryId,
            date: getCurrentDate()
        }

        // 2- upload budget and budget expenses
        const newBudget = await createBudgetUseCase.createBudget(budgetCreate)


        if (newBudget) {

            navigation.replace(ScreenRoutes.BUDGET, {
                categoryList: categories,
                budget: newBudget
            })

        } else {
            console.error("Error creating budget")
        }

    }

    // ------------------- return ------------------- //
    return {
        modalState,
        categories,
        budgetState,
        updateBudgetName,
        updateBudgetAmount,
        updateCategory,
        onSubmit

    }


}

export default useBudgetsFormViewModel