import { Role } from './role';

export class User {
  id: number;
  documentId: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: Role[];

  constructor(id: number, documentId: number, name: string, lastname: string, email: string, password: string, roles: Role[]) {
    this.id = id;
    this.documentId = documentId;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}
