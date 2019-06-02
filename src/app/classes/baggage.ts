export class Baggage {
    id: number;
    status: string;
    description: string;

    constructor(id: number, status: string, description: string) {
      this.id = id;
      this.status = status;
      this.description = description;
    }
  }