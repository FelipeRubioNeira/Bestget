import { useState } from "react";
import { IncomesCreateScreenProps } from "../../navigation/NavigationTypes";
import { ScreensRoutes } from "../../navigation/Routes";
import { CreateIncomeUseCase } from "../../../domain/useCases/CreateIncomeUseCase";
import { IncomeRepository } from "../../../data/repository/incomeRepository/IncomeRepository";
import { IncomesCreateDataSource } from "../../../data/repository/incomeRepository/IncomesCreateDataSource";
import { Income } from "../../../data/models/Income";



const useIncomeCreateViewModel = ({ navigation }: IncomesCreateScreenProps) => {



    // ------------------- states ------------------- //
    const [incomeName, setIncomeName] = useState<string | number>("")
    const [incomeAmount, setIncomeAmount] = useState<string | number>(0)


    const incomesCreateDataSource = new IncomesCreateDataSource()
    const incomeRepository = new IncomeRepository(incomesCreateDataSource)
    const inconmeUseCase = new CreateIncomeUseCase(incomeRepository)



    // ------------------- methods ------------------- //
    const updateIncomeName = (newIncomeName: string) => {
        setIncomeName(newIncomeName)
    }

    const updateIncomeAmount = (newIncomeAmount: number) => {
        setIncomeAmount(newIncomeAmount)
    }

    const saveNewIncome = () => {

        /* 
            llamamos al caso de uso correspondiente
            para guardar el nuevo ingreso

            el caso de uso se encargará de guardar el nuevo ingreso
            
            el viewModel se encarga de validar que los campos de la UI
            estan correctamente ingresados

            en caso de que esten correctos pasamos a subir el nuevo ingreso
            
         */

        // hay que hacer algo para convertir estos valores correctamente. (crear una fx)
        const newIncome = new Income(
            incomeName.toString(),
            parseInt(incomeAmount + "")
        )

        inconmeUseCase.createIncome(newIncome)

        navigation.navigate(ScreensRoutes.INCOMES)
    }



    // ------------------- return ------------------- //
    return {

        incomeName, updateIncomeName,
        incomeAmount, updateIncomeAmount,

        saveNewIncome
    }


}

export default useIncomeCreateViewModel;