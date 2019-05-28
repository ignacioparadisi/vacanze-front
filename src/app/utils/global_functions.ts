export function compararFechas(ini: Date, fin: Date){
    if (ini.getTime() <= fin.getTime() && (ini.getTime() >= Date.now())) {
        return 1;
    } else {
        return -1;
    }
}