import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Pencil, Trash } from 'lucide-react';
import { Pasajero } from '@/interfaces/Pasajero';

interface PassengerTableProps {
  pasajeros: Pasajero[];
  onEdit: (pasajero: Pasajero) => void;
  onDelete: (pasajeroId: number) => void;
}

const PassengerTable = ({ pasajeros, onEdit, onDelete }: PassengerTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: "4px 8px" }}>ID</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Nombre</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Apellido</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Documento</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pasajeros.map((pasajero) => (
            <TableRow key={pasajero.idPasajero}>
              <TableCell sx={{ padding: "4px 8px" }}>{pasajero.idPasajero}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{pasajero.nombrePasajero}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{pasajero.apellidoPasajero}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{pasajero.documentoIdentidadPasajero}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>
              <IconButton
                  color="secondary"
                  onClick={() => onEdit(pasajero)}
                  sx={{ padding: "4px", height: "25px", width: "25px" }}
                >
                  <Pencil fontSize="small" />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDelete(pasajero.idPasajero)}
                  sx={{ padding: "4px", height: "25px", width: "25px" }}
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

export default PassengerTable;
