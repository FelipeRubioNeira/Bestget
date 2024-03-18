import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { ValidationResult } from "../../data/types/Validation";
import { isConnected } from "../../utils/Connection";

class DeleteIncomeUseCase {
    constructor(private incomeRepository: IIncomeRepository) { }

    async delete(id: string): Promise<ValidationResult<string>> {

        const validationResult: ValidationResult<string> = {
            isValid: true,
            message: {
                title: "",
                message: ""
            },
            result: ""
        }


        if(await isConnected()){
            await this.incomeRepository.delete(id)

        }else{
            validationResult.isValid = false
            validationResult.message = {
                title: "Error al eliminar el ingreso.",
                message: "No hay conexión a internet."
            }
        }


        return validationResult
    }

}

export default DeleteIncomeUseCase