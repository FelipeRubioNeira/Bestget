export const getCurrentDate = () => {

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

    return convertToIsoString(formattedDateTime)
    
}

const convertToIsoString = (dateTime: string) => {

    const dateTimeArray = dateTime.split(" ")

    const dateArray = dateTimeArray[0].split("-")
    const timeArray = dateTimeArray[1].split(":")

    const date = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0]
    const time = timeArray[0] + ":" + timeArray[1] + ":" + timeArray[2]

    return date + "T" + time

}