import React from "react";
import { Vuelo } from "@/interfaces/Vuelo";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Button,
  Paper,
  TableContainer 
} from "@mui/material";

interface FlightTableProps {
  flights: Vuelo[];
  onEdit: (flight: Vuelo) => void;
  onDelete: (flightId: string) => void;
}

const FlightTable = ({ flights, onEdit, onDelete }: FlightTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Origen</TableCell>
            <TableCell>Destino</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight.idVuelo}>
              <TableCell>{flight.idVuelo}</TableCell>
              <TableCell>{flight.aeropuertoOrigen.nombreAeropuerto}</TableCell>
              <TableCell>{flight.aeropuertoDestino.nombreAeropuerto}</TableCell>
              <TableCell>{flight.fechaSalidaVuelo}</TableCell>
              <TableCell>{flight.horaSalidaVuelo}</TableCell>
              <TableCell>${flight.precioVuelo}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onEdit(flight)}
                  className="mr-2"
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(flight.idVuelo.toString())}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FlightTable;