import React from 'react';
import {Vuelo} from "@/interfaces/Vuelo";
import {Button, Card, Divider} from "@mui/material";
import moment from "moment";
import {parseToCurrency} from "@/lib/utils";

interface FlightsProps {
    flights: Vuelo[];
}

const Flights = ({ flights }: FlightsProps) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {flights.map((flight: Vuelo) => (
                <Card key={flight.idVuelo} className="p-4 shadow-md" variant="outlined">
                    <h6 className="text-lg text-gray-900 font-bold">Vuelo a {flight.aeropuertoDestino.ciudadAeropuerto}, {flight.aeropuertoDestino.paisAeropuerto}</h6>
                    <p className="text-sm text-gray-500 my-2">Partiendo desde {flight.aeropuertoOrigen.ciudadAeropuerto}, {flight.aeropuertoOrigen.paisAeropuerto}</p>
                    <p className="text-sm text-gray-500 my-2">Por {flight.aerolinea.nombreAerolinea}</p>
                    <Divider />
                    <h5 className="text-xs mt-4">Horario</h5>
                    <p className="text-lg text-gray-950 font-semibold">Salida: {moment(flight.horaSalidaVuelo, "HH:mm:ss").format('HH:mm')}</p>
                    <p className="text-lg text-gray-950 font-semibold">Llegada: {moment(flight.horaSalidaVuelo, "HH:mm:ss").add(flight.duracionMinutosVuelo, 'minutes').format('HH:mm')}</p>
                    <Divider />
                    <h5 className="text-xs mt-4">Precio</h5>
                    <p className="text-lg text-gray-950 font-semibold mb-4">{parseToCurrency(flight.precioVuelo)}</p>
                    <Button variant="contained" color="secondary" className="w-full">Reservar</Button>
                </Card>
            ))}
        </div>
    );
};

export default Flights;