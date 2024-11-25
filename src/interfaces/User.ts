import { Cliente } from "./Cliente";
import { Role } from "./Role";

export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    roles: Role[];
    cliente: Cliente;
  }