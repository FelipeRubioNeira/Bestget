import ISavedDateRepository from "../../data/repository/savedDateRpository/ISavedDateRepository";
import { DateInterval } from "../../data/types/DateInterval";

class UpdateSavedDateUseCase {
  constructor(private readonly savedDateRepository: ISavedDateRepository) {}

    async execute(dateInterval: DateInterval): Promise<void> {
        return this.savedDateRepository.saveDate(dateInterval)
    }

}

export default UpdateSavedDateUseCase