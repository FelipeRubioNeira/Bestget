import { fetch } from "@react-native-community/netinfo";

const isConnected = async () => {
    const status = fetch().then(state => state.isConnected);
    return status;
}


export {
    isConnected
}