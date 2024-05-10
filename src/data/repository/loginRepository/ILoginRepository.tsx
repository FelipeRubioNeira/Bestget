
interface ILoginRepository<T> {
    login: () => Promise<T>
    logout: () => Promise<void>
}

export default ILoginRepository