
// isoDate: AAAA-MM-DDTHH:MM:SS
const getCurrentDate = () => {

    // Crear un objeto Date con la fecha y hora actual
    const now = new Date();

    // Obtener la zona horaria para Chile
    const chileTimeZone = 'America/Santiago';

    // Crear un objeto DateTimeFormat con la zona horaria y opciones de formato
    const formatter = new Intl.DateTimeFormat('es-CL', {
        timeZone: chileTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Usar formato de 24 horas
    });

    // Formatear la fecha y hora actual según la zona horaria de Chile
    const formattedDateTime = formatter.format(now);

    const dateTimeSplitted = formattedDateTime.split(" ")

    const date = convertToAmericanDate(dateTimeSplitted[0])
    return date + "T" + dateTimeSplitted[1]

}

const convertToIsoDate = (date: string): string => {

    let localDate = date

    if (!localDate) {
        return new Date().toISOString();
    }

    const [day, month, year] = localDate.split("-");
    return `${year}-${month}-${day}T00:00:00`;

}


const convertToNormalDate = (
    date?: string | number | Date,
    type: "normal" | "american" = "normal"
): string => {

    const parsedDate = new Date(date || new Date());

    const day = parsedDate.getUTCDate().toLocaleString().padStart(2, '0');
    const month = (parsedDate.getUTCMonth() + 1).toLocaleString().padStart(2, '0');
    const year = parsedDate.getUTCFullYear();

    if (type === "normal") return `${day}-${month}-${year}`;
    else return `${year}-${month}-${day}`;

}

const convertToAmericanDate = (date: string = ""): string => {

    if (!date) return date;

    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
}


export {
    getCurrentDate,
    convertToNormalDate,
    convertToAmericanDate,
    convertToIsoDate
}