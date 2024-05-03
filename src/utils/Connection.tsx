import { fetch } from "@react-native-community/netinfo";
import { Validation } from "../data/types/Validation";

const isConnected = async () => {
    const status = fetch().then(state => state.isConnected);
    return status;
}

const validateConnection = async (): Promise<Validation> => {

    const result: Validation = {
        isValid: true,
        message: "",
    }

    const isConnectedResult = await isConnected()

    if (!isConnectedResult) {
        result.isValid = false
        result.message = "Verifique su conexión a internet y vuelva a intentarlo."
    }

    return result

}



export {
    isConnected,
    validateConnection
}