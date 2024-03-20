import { Validation } from "../data/types/Validation"


const validateInputs = (name = "", amount = 0, type: "ingreso" | "gasto" | "presupuesto"): Validation => {

    const result: Validation = {
        isValid: true,
        errorMessage: "",
    }

    if (name.trim() === "") {
        result.isValid = false
        result.errorMessage = `El nombre de su ${type} no puede estar vacío.`

    } else if (amount === 0) {
        result.isValid = false
        result.errorMessage = `El monto de ${type} debe ser mayor que $0.`
    }

    return result

}

export {
    validateInputs
}