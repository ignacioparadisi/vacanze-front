import { Role } from './role';

export class User {
  id: number;
  documentId: number;
  name: string;
  lastname: string;
  email: string;
  roles: Role[];

  constructor(id: number, documentId: number, name: string, lastname: string, email: string, roles: Role[]) {
    this.id = id;
    this.documentId = documentId;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.roles = roles;
  }
}
