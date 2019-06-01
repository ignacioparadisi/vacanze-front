export class Baggage {
    id: number;
    pasaporte: string;
    description: string;
  
    constructor(id: number, pasaporte: string, description: string) {
      this.id = id;
      this.pasaporte = pasaporte;
      this.description = description;
    }
  }