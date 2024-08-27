import { Validation } from "../data/types/Validation"

type ValidationFields = {
    name: string,
}


const validateInputs = (name = "", amount = 0, type: "ingreso" | "gasto" | "presupuesto"): Validation => {

    const result: Validation = {
        isValid: true,
        message: "",
    }

    if (name.trim() === "") {
        result.isValid = false
        result.message = `El nombre de su ${type} no puede estar vacío.`

    } else if (amount === 0) {
        result.isValid = false
        result.message = `El monto de ${type} debe ser mayor que $0.`
    }

    return result

}

const validateGroupFields = ({ name }: ValidationFields): Validation => {

    const result: Validation = {
        isValid: true,
        message: "",
    }

    if (name.trim() === "") {
        result.isValid = false
        result.message = "El nombre del grupo no puede estar vacío."
    }

    return result

}

export {
    validateInputs,
    validateGroupFields
}