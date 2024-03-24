interface ICriteria<T> {
    meetCriteria(data: T[]): T[];
}
