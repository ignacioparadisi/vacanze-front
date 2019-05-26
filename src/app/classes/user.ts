export class User {
  id: number;
  documentId: number;
  name: string;
  lastname: string;
  email: string;
  role: number;

  constructor(id: number, documentId: number, name: string, lastname: string, email: string, role: number) {
    this.id = id;
    this.documentId = documentId;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
  }
}
