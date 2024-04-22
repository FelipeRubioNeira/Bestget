

class DateTime {

    date: string;

    // default returns a iso string date
    constructor(date?: Date | string | number) {
        const inicialDate = new Date(date || Date.now());
        this.date = this.getCurrentDate(inicialDate)
        return this;
    }

    getTime = (date?: string): string => {
        const newDate = date || this.date;
        const { hour, minute, second } = this.separateDate(newDate);
        return `${hour}:${minute}:${second}`;
    }

    getStartOfMonth = (date: string): string => {
        const { year, month } = this.separateDate(date);
        return `${year}-${month}-01T00:00:00`
    }


    // ------------------- change the orden ------------------- //

    convertToNormalDate = (date: string): string => {
        const { year, month, day } = this.separateDate(date);
        return `${day}-${month}-${year}`;
    }

    convertToAmericanDate = (date: string): string => {
        const { year, month, day } = this.separateDate(date);
        return `${year}-${month}-${day}`;
    }

    // ------------------- change the orden ------------------- //


    getCurrentDate = (date: Date): string => {
        const localTimezone = this.getLocalTimezone();
        const formatedDate = this.formatDate(localTimezone, date);
        const newDate = this.generateIsoStringDate(formatedDate);

        return newDate
    }

    getMonth = (date?: string): string => {

        if (!date) {
            return this.separateDate(this.date).month;
        }

        const { month } = this.separateDate(date);
        return month;
    }

    getNextMonth = (date: string): string => {

        if (!date) return this.getCurrentDate(new Date())

        const currentDate = new Date(date)

        currentDate.setMonth(currentDate.getMonth() + 1);
        return this.generateIsoStringDate(this.formatDate(this.getLocalTimezone(), currentDate));
    }

    getMonthName = (month: number): string => {
        const date = new Date(2020, month - 1);
        return new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
    }

    getYear = (date?: string): string => {

        if (!date) {
            return this.separateDate(this.date).year;
        }

        const { year } = this.separateDate(date);
        return year;
    }

    private separateDate = (date: string = "") => {

        if (!date) return {
            year: "0000",
            month: "00",
            day: "00",
            hour: "00",
            minute: "00",
            second: "00"
        }


        let separtor = " "
        let isoFormat = false


        if (date.includes("T")) {
            separtor = "T"
            isoFormat = true
        }


        // 28-03-2024 08:08:56 or 2024-03-28T08:08:56
        const dateArray = date.split(separtor)

        // 28-03-2024 or 2024-03-28
        const dateSplitted = dateArray[0].split("-")


        
        // Check if time is present
        const timeExists = dateArray.length > 1

        // 08:08:56
        const timeSplitted = timeExists ? dateArray[1].split(":") : ["00", "00", "00"]



        const year = isoFormat ? dateSplitted[0] : dateSplitted[2]
        const month = dateSplitted[1]
        const day = isoFormat ? dateSplitted[2] : dateSplitted[0]

        const hour = timeSplitted[0]
        const minute = timeSplitted[1]
        const second = timeSplitted[2]

        return {
            year,
            month,
            day,
            hour,
            minute,
            second
        }

    }

    private generateIsoStringDate = (date: string): string => { // 28-03-2024 08:08:56

        const {
            year,
            month,
            day,
            hour,
            minute,
            second
        } = this.separateDate(date)

        return `${year}-${month}-${day}T${hour}:${minute}:${second}`

    }

    private formatDate = (localTimezone: string, date: Date = new Date()) => {

        const formatter = new Intl.DateTimeFormat('es-CL', {
            timeZone: localTimezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // Usar formato de 24 horas,
        });

        return formatter.format(date);
    }

    private getLocalTimezone = (): string => {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    };


}

export default DateTime;
