export function compararFechas(ini: Date, fin: Date) {
    console.log( fin.getTime() - ini.getTime() );
    if ( ( fin.getTime() - ini.getTime() ) > 0  && ini.getTime() >= Date.now() ) {
        return 1;
    } else {
        return -1;
    }
}

export function compararCiudades(salida: number, destino: number) {
    console.log(salida, destino);
    if ( salida != destino ) {
        return 1;
    } else {
        return -1;
    }
}

export function transformImageToBase64(event, accept) {
    if (event.target.files && event.target.files[0]) {
        var reader: any = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = e => {
            // called once readAsDataURL is completed
            return accept(e.target.result);
        };
    }
}