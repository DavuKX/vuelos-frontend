import { Pasajero } from "./Pasajero";

export interface ReservaRequest {
    idCliente: number;
    pasajeros: Pasajero[];
    idVuelo: number;
}