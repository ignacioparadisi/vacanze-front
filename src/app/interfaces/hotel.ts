export interface Hotel{
  id: number,
  name: string,
  amountOfRooms: number,
  roomCapacity: number,
  isActive : boolean,
  addressSpecification: string,
  pricePerRoom: number,
  phone: string,
  website: string,
  picture: string,
  stars: number,
  location: number /*{ // por ahora el id de la ubicacion solamente
    id : 1
  }*/
}
