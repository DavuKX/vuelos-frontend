import React from "react";
import { Vuelo } from "@/interfaces/Vuelo";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Paper,
  TableContainer, 
  IconButton
} from "@mui/material";
import { Trash, Pencil } from "lucide-react";

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
                <IconButton color="secondary" onClick={() => onEdit(flight)} sx={{ padding: "4px", height: "25px", width: "25px"}}>
                        <Pencil fontSize="small" /> {}
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(flight.idVuelo.toString())} sx={{ padding: "4px", height: "25px", width: "25px"}}>
                        <Trash fontSize="small" /> {}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FlightTable;
