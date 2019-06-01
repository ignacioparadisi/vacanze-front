export interface Res_restaurant {
    idUser: number,
    //Datos del restaurant
    capacity_rest: number,
    specialty: string,
    price: number,
    picture: string,
    phone: number,
    location: number,
    //Datos de la reserva
    people: number,
    res_date: string //fecha futuro para cual reservara
}
