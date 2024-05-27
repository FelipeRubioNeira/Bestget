

/**
 * This interface is in charge of manipulate data in the database
 * 
 * @param InputType: the type of the data that will be inserted in the database
 * @param OutputType: the type of the data that will be returned from the database
 * @param FilterParam: the type of the data that will be used to filter the data
 */
interface IOperation<InputType, OutputType, FilterParam> {

    // ----------------- individual data ----------------- //
    create: (value: InputType) => Promise<OutputType | null>
    update: (value: InputType) => Promise<boolean>
    delete: (id: string) => Promise<boolean>
    count: (params: FilterParam) => Promise<number>
    getAll: (params: FilterParam) => Promise<OutputType[]>

}

export default IOperation