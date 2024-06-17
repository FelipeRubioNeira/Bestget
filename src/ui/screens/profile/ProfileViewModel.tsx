import { ProfileScreenProps } from "../../../navigation/NavigationParamList"
import { ScreenRoutes } from "../../../navigation/Routes"


const useProfileViewModel = ({ navigation }: ProfileScreenProps) => {

    const closeSession = () => { 
        navigation.navigate(ScreenRoutes.LOGIN)
    }

    return {
        closeSession
    }
}

export default useProfileViewModel