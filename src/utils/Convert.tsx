export const applyPesoCurrency = (value: number): string => {



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