import { Travel} from './travel';




export class hotelreservations {
checkIn: number;
hotelId: number;

checkOut: number;


constructor(checkIn :number , hotelId : number ,checkOut : number){
    this.checkIn = checkIn;
    this.hotelId = hotelId;
    this.checkOut = checkOut;
    
 }

}