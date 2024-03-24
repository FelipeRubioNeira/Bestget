
export const currencyFormat = (value: number | string): string => {

    let number = value.toString().replace(/\./g, '');

    // Separar la parte entera y la parte decimal
    const partes = number.split(',');
    let parteEntera = partes[0];
    const parteDecimal = partes.length > 1 ? ',' + partes[1] : '';

    // Agregar separador de miles a la parte entera
    const regexMiles = /\B(?=(\d{3})+(?!\d))/g;
    parteEntera = parteEntera.replace(regexMiles, '.');

    // Combinar la parte entera y la parte decimal
    const resultado = parteEntera + parteDecimal;

    return resultado;
}

export const numberFormat = (value: string = ""): number => {
    if (value === "") return 0;
    const formattedValue = value.replace(/\./g, '')
    return parseInt(formattedValue)
}