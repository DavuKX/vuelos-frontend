import { Pasajero } from "./Pasajero";
import { Vuelo } from "./Vuelo";

export interface Reserva {
    idReserva: number;
    clienteId: number;
    fechaReserva: string;
    pasajeros: Pasajero[];
    vuelos: Vuelo[];
}
