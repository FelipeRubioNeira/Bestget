import UserApp from "../../types/User"

interface ILoginRepository {
    login: () => Promise<UserApp | null>
    logout: () => Promise<void>
    saveUser: (user: UserApp) => Promise<void>
    getUser: () => Promise<UserApp | null>
    cleanUser: () => Promise<void>
}

export default ILoginRepository