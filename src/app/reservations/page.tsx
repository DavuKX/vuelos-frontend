'use client';
import { getAuthUser } from "@/actions/auth";
import { Reserva } from "@/interfaces/Reserva";
import axiosInstance from "@/services/axiosInstance";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

const page = () => {
    useEffect(() => {
        const fetchUser = async (): Promise<number | undefined> => {
            const user = await getAuthUser();
            return user?.cliente.idCliente;
        }

        const fetchReservations = async (clienteId: number) => {
            const response = await axiosInstance.get(`/reservas/cliente/${clienteId}`);
            const data = await response.data;
            setReservations(data);
        }

        fetchUser().then(clienteId => fetchReservations(clienteId as number));
    }, []);

    const [reservations, setReservations] = useState<Reserva[]>([]);

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-900">Mis Reservas</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="reservas">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id Reserva</TableCell>
                            <TableCell>Fecha Reserva</TableCell>
                            <TableCell>Aeropuerto</TableCell>
                            <TableCell>Origen</TableCell>
                            <TableCell>Destino</TableCell>
                            <TableCell>Fecha Vuelo</TableCell>
                            <TableCell>Hora Vuelo</TableCell>
                            <TableCell>Ticketes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.map((row) => (
                            <TableRow
                                key={row.idReserva}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.idReserva}
                                </TableCell>
                                <TableCell>{row.fechaReserva}</TableCell>
                                <TableCell>{row.vuelos[0]?.aeropuertoOrigen?.nombreAeropuerto}</TableCell>
                                <TableCell>{row.vuelos[0]?.aeropuertoOrigen?.paisAeropuerto}, {row.vuelos[0]?.aeropuertoOrigen?.ciudadAeropuerto}</TableCell>
                                <TableCell>{row.vuelos[0]?.aeropuertoDestino?.paisAeropuerto}, {row.vuelos[0]?.aeropuertoDestino?.ciudadAeropuerto}</TableCell>
                                <TableCell>{moment(row.vuelos[0]?.fechaSalidaVuelo, 'yyyy-MM-dd').locale('es').format('ll')}</TableCell>
                                <TableCell>{moment(row.vuelos[0]?.horaSalidaVuelo, 'HH:mm:ss').format('HH:mm')}</TableCell>
                                <TableCell>{row.pasajeros.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default page;