import UserApp from "../../types/User"

interface ILoginRepository<T> {
    login: () => Promise<T>
    logout: () => Promise<void>
    saveUser: (user: UserApp) => Promise<void>
    getUser: () => Promise<UserApp | null>
    cleanUser: () => Promise<void>
}

export default ILoginRepository