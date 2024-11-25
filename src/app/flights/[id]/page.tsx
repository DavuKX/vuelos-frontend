'use client';
import { Vuelo } from "@/interfaces/Vuelo";
import { parseMinutes, parseToCurrency } from "@/lib/utils";
import axiosInstance from "@/services/axiosInstance";
import { Box, Button, Card, Divider, TextField } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import { useEffect, useState } from 'react';

import { getAuthUser } from "@/actions/auth";
import { Pasajero } from "@/interfaces/Pasajero";
import { ReservaRequest } from "@/interfaces/ReservaRequest";
import { User } from "@/interfaces/User";
import {
    Plane,
    X
} from 'lucide-react';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page = ({ params}: {
    params: Promise<{ id: string }>;
}) => {
    useEffect(() => {
        async function fetchFlight() {
            const id = (await params).id;
            const response: AxiosResponse = await axiosInstance.get(`/vuelos/${id}`);
            const data = response.data as Vuelo;
            setFlight(data);
        }
        async function fetchUser() {
            const user = await getAuthUser();

            if (user === null) {
                return;
            }
            setUser(user);
            setPassengers([{ idPasajero: 1, nombrePasajero: user.cliente.nombreCliente, apellidoPasajero: user.cliente.apellidoCliente, documentoIdentidadPasajero: user.cliente.documentoIdentidad }]);
        }

        fetchFlight().then(() => console.log('Flight fetched'));
        fetchUser().then(() => console.log('User fetched'));
    }, []);

    const [passengers, setPassengers] = useState<Pasajero[]>([{ idPasajero: 1, nombrePasajero: '', apellidoPasajero: '', documentoIdentidadPasajero: '' }]);
    const [flight, setFlight] = useState<Vuelo | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const handleAddPassenger = () => {
        const newPassenger: Pasajero = { idPasajero: passengers.length + 1, nombrePasajero: '', apellidoPasajero: '', documentoIdentidadPasajero: '' };
        setPassengers([...passengers, newPassenger]);
    };

    const handleRemovePassenger = (id: Number) => {
        setPassengers(passengers.filter((passenger) => passenger.idPasajero !== id));
    };

    const fees = 100000;
    const ticketPrice = flight !== null ? flight.precioVuelo * passengers.length : 0;

    if (flight === null) {
        return <p>Cargando...</p>;
    }

    const handleEditPassenger = (id: Number, field: string, value: string) => {
        setPassengers(passengers.map((passenger) => {
            if (passenger.idPasajero === id) {
                return { ...passenger, [field]: value };
            }
            return passenger;
        }));
    }

    const onReserve = async () => {
        if (user === null) {
            toast.error('Por favor inicie sesión para continuar');
            return;
        }

        passengers.forEach((passenger) => {
            if (passenger.nombrePasajero === '' || passenger.apellidoPasajero === '' || passenger.documentoIdentidadPasajero === '') {
                toast.error('Por favor complete todos los campos de los pasajeros');
                return;
            }
        });

        const reservaRequest: ReservaRequest = {
            idCliente: user.cliente.idCliente,
            pasajeros: passengers,
            idVuelo: flight.idVuelo
        };

        try {
            await axiosInstance.post('/reservas', reservaRequest);
            toast.success('Reserva realizada con éxito');
            router.push('/dashboard');
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
                return;
            }

            toast.error('Ha ocurrido un error al realizar la reserva');
        }
    }

    return (
        <div className="grid grid-cols-8 gap-4">
            <Card className="p-4 col-span-5 shadow-md" variant="outlined">
                <h5 className="text-lg text-gray-900 font-bold mb-4">¿Quienes viajan?</h5>
                {passengers.map((passenger, index) => (
                    <Box
                        key={passenger.idPasajero}
                        component="form"
                        sx={{ '& > :not(style)': { m: 1 } }}
                        noValidate
                        autoComplete="off"
                        className="grid grid-cols-1 mb-4"
                    >
                        <TextField
                            id={`name-${passenger.idPasajero}`}
                            label="Nombre"
                            variant="standard"
                            size="small"
                            value={passenger.nombrePasajero}
                            onChange={(e) => handleEditPassenger(passenger.idPasajero, 'nombrePasajero', e.target.value)}
                        />
                        <TextField
                            id={`lastName-${passenger.idPasajero}`}
                            label="Apellido"
                            variant="standard"
                            size="small"
                            value={passenger.apellidoPasajero}
                            onChange={(e) => handleEditPassenger(passenger.idPasajero, 'apellidoPasajero', e.target.value)}
                        />
                        <TextField
                            id={`documentoIdentidadPasajero-${passenger.idPasajero}`}
                            label="Número Identificación"
                            variant="standard"
                            size="small"
                            value={passenger.documentoIdentidadPasajero}
                            onChange={(e) => handleEditPassenger(passenger.idPasajero, 'documentoIdentidadPasajero', e.target.value)}
                        />
                        {index > 0 && (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleRemovePassenger(passenger.idPasajero)}
                                sx={{ marginTop: 1 }}
                            >
                                Eliminar Pasajero
                            </Button>
                        )}
                    </Box>
                ))}

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddPassenger}
                >
                    Agregar Pasajero
                </Button>
            </Card>
            <div className="grid grid-rows-2 gap-4 col-span-3">
                <Card className="p-4 shadow-md flex flex-col h-full" variant="outlined">
                    <h5 className="text-lg text-gray-900 font-bold mb-4">Detalle del Pago</h5>
                    <div className="flex justify-between">
                        <p className="text-sm text-gray-600 mb-4">
                            Vuelo para {passengers.length} pasajero{passengers.length > 1 ? 's' : ''}
                        </p>
                        <p className="text-sm text-gray-600">{parseToCurrency(ticketPrice)}</p>
                    </div>
                    <div className="flex justify-between mb-4">
                        <p className="text-sm text-gray-600">Impuesto, tasas y cargos</p>
                        <p className="text-sm text-gray-600">{parseToCurrency(fees)}</p>
                    </div>
                    <div className="mt-auto">
                        <Divider />
                        <div className="flex justify-between mt-4">
                            <p className="text-lg text-gray-900 font-bold">Total</p>
                            <p className="text-lg text-gray-900 font-bold">{parseToCurrency(ticketPrice + fees)}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 shadow-md" variant="outlined">
                    <h5 className="text-lg text-gray-900 font-bold mb-4">Detalle de la compra</h5>
                    <p className="text-sm text-gray-600 mb-4">{flight?.aeropuertoOrigen.paisAeropuerto}, {flight?.aeropuertoOrigen.ciudadAeropuerto} - {flight?.aeropuertoDestino.paisAeropuerto}, {flight?.aeropuertoDestino.ciudadAeropuerto}</p>
                    <p className="text-sm text-gray-600">IDA</p>
                    <p className="text-sm text-gray-900 font-bold mb-4">{moment(flight?.fechaSalidaVuelo, 'yyyy-MM-dd').locale('es').format('ll')}</p>
                    <p className="text-sm text-gray-900 font-bold flex justify-items-center mb-4">
                        <Plane className="mr-1"/>
                        {flight.aerolinea.nombreAerolinea}
                    </p>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm text-gray-600">{flight.aeropuertoOrigen.ciudadAeropuerto.substring(0, 3)}</p>
                            <p className="text-lg text-gray-900 font-bold">{moment(flight.horaSalidaVuelo, 'HH:mm:ss').format('HH:mm')}</p>
                        </div>
                        <div>
                            <p className="text-sm text-teal-700 border-teal-700 border-b-2">Directo</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{flight.aeropuertoDestino.ciudadAeropuerto.substring(0, 3)}</p>
                            <p className="text-lg text-gray-900 font-bold">{moment(flight.horaSalidaVuelo, 'HH:mm:ss').add(flight.duracionMinutosVuelo, 'minutes').format('HH:mm')}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Duración</p>
                            <p className="text-sm text-gray-600">{parseMinutes(flight.duracionMinutosVuelo)}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h5 className="text-sm font-bold text-gray-900 mb-2">Política de cambios y cancelaciones</h5>
                        <Divider className="mb-4"/>
                        <div>
                            <p className="text-sm text-gray-600 mt-4 font-bold">Cambios</p>
                            <p className="text-sm text-red-600 flex"><X className="w-5 h-5"/>No permite</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mt-4 font-bold">Cancelación</p>
                            <p className="text-sm text-red-600 flex"><X className="w-5 h-5"/>No permite</p>
                        </div>
                    </div>
                </Card>
            </div>
            <div>
                <Button variant="contained" color="secondary" onClick={onReserve}>
                    Reservar
                </Button>
            </div>
        </div>
    );
};

export default Page;
