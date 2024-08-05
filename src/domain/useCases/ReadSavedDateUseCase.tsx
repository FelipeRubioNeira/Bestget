import ISavedDateRepository from "../../data/repository/savedDateRpository/ISavedDateRepository";
import { DateInterval } from "../../data/types/DateInterval";

class ReadSavedDateUseCase {
    constructor(private readonly savedDateRepository: ISavedDateRepository) { }

    async execute(): Promise<DateInterval | null> {
        return this.savedDateRepository.getDate()
    }
}

export default ReadSavedDateUseCase