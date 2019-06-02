export class Baggage {
    id: number;
    status: string;
    description: string;
    pasaporte: string;

    constructor(id: number, status: string, description: string, pasaporte: string,) {
      this.id = id;
      this.status = status;
      this.description = description;
      this.pasaporte = pasaporte;
    }
  } 