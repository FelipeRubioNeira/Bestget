import { DateInterval } from "../../types/DateInterval"

interface ISavedDateRepository {
    saveDate: (dateInterval: DateInterval) => void
    getDate: () => Promise<DateInterval | null>
}

export default ISavedDateRepository