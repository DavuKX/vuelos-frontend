import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import { Pencil, Trash } from 'lucide-react';
import { Aeropuerto } from '@/interfaces/Aeropuerto';

interface AirportTableProps {
  airports: Aeropuerto[];
  onEdit: (airport: Aeropuerto) => void;
  onDelete: (airportId: number) => void;
}

const AirportTable = ({ airports, onEdit, onDelete }: AirportTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: "4px 8px" }}>ID</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Nombre</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Ciudad</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>País</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {airports.map((airport) => (
            <TableRow key={airport.idAeropuerto}>
              <TableCell sx={{ padding: "4px 8px" }}>{airport.idAeropuerto}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{airport.nombreAeropuerto}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{airport.ciudadAeropuerto}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{airport.paisAeropuerto}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>
                <IconButton
                  color="secondary"
                  onClick={() => onEdit(airport)}
                  sx={{ padding: "4px", height: "25px", width: "25px"}}
                >
                  <Pencil fontSize="small" />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDelete(airport.idAeropuerto)}
                  sx={{ padding: "4px", height: "25px", width: "25px"}}
                >
                  <Trash fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AirportTable;