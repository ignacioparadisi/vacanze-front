export function compararFechas(ini: Date, fin: Date) {
    console.log( fin.getTime() - ini.getTime() );
    if ( ( fin.getTime() - ini.getTime() ) > 0  && ini.getTime() >= Date.now() ) {
        return 1;
    } else {
        return -1;
    }
}
