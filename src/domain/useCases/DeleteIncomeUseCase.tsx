import { IIncomeRepository } from "../../data/repository/incomeRepository/IIncomeRepository";
import { ValidationResult } from "../../data/types/Validation";
import { validateConnection } from "../../utils/Connection";

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

        const result = await validateConnection()

        if(result.isValid){
            await this.incomeRepository.delete(id)

        }else{
            validationResult.isValid = false
            validationResult.message = {
                title: "Error al eliminar el ingreso.",
                message: result.errorMessage
            }
        }

        return validationResult
    }

}

export default DeleteIncomeUseCase