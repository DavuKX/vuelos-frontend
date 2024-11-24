import {Aerolinea} from "@/interfaces/Aerolinea";
import {Aeropuerto} from "@/interfaces/Aeropuerto";

export interface Vuelo {
    idVuelo: number;
    fechaSalidaVuelo: string;
    horaSalidaVuelo: string;
    duracionMinutosVuelo: number;
    countPasajeros: number;
    countReservas: number;
    capacidadVuelo: number;
    aerolinea: Aerolinea;
    aeropuertoOrigen: Aeropuerto;
    aeropuertoDestino: Aeropuerto;
}