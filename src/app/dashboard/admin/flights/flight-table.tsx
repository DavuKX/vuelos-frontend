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
            <TableCell sx={{ padding: "4px 8px" }}>ID</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Origen</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Destino</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Fecha</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Hora</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Precio</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight.idVuelo}>
              <TableCell sx={{ padding: "4px 8px" }}>{flight.idVuelo}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>
                {flight.aeropuertoOrigen ? flight.aeropuertoOrigen.nombreAeropuerto : 'Desconocido'}
              </TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>
                {flight.aeropuertoDestino ? flight.aeropuertoDestino.nombreAeropuerto : 'Desconocido'}
              </TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{flight.fechaSalidaVuelo}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{flight.horaSalidaVuelo}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{flight.precioVuelo ?? '--'}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>
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
