class ColorsApp {

    static hexToRGB(hex: string, opacity?: number): string {

        // Eliminar el símbolo de almohadilla (#) si está presente
        hex = hex.replace(/^#/, '');

        // Verificar que el string hexadecimal tenga una longitud válida (3 o 6 caracteres)
        if (hex.length === 3) {
            // Si es un shorthand (ej. "03F"), convertirlo a formato completo (ej. "0033FF")
            hex = hex.split('').map(char => char + char).join('');
        } else if (hex.length !== 6) {
            throw new Error('El valor hexadecimal no es válido.');
        }

        // Convertir los componentes del string hexadecimal a valores numéricos
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return `rgba(${r}, ${g}, ${b}, ${opacity || 1} )`;
    }

}

export default ColorsApp;