import { useState } from "react"


const useSearchViewModel = () => {

    const [searchedValue, setSearchedValue] = useState<string>("")

    const updateSearchValue = (text: string) => {
        setSearchedValue(text)
    }

    function onSearch<T>(
        value: string,
        propertyName: string,
        list: T[]
    ) {

        updateSearchValue(value)

        if (value === "") return list

        const key = value.toLowerCase()

        return list.filter((item: any) => {
            return item[propertyName].toLowerCase().includes(key)
        })

    }

    return {
        searchedValue,
        updateSearchValue,
        onSearch
    }

}

export default useSearchViewModel   