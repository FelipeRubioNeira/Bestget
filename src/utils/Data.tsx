
function findItem<T>(array: T[], element: T): T | undefined {
    return array.find(item => item === element)
}

export default findItem