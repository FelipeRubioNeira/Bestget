type SortOrder = 'asc' | 'desc';


function sortByDate<T extends { [key: string]: any }>(
    array: T[],
    dateKey: string,
    order: SortOrder = 'desc'
): T[] {

    return array.sort((a, b) => {

        const timeA = new Date(a[dateKey]).getTime();
        const timeB = new Date(b[dateKey]).getTime();

        if (order === 'asc') {
            return timeA - timeB;

        } else {
            return timeB - timeA;
        }

    });
}

export type {
    SortOrder
}

export {
    sortByDate
}