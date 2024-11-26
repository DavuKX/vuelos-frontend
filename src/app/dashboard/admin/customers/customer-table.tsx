import React from "react";
import { Cliente } from "@/interfaces/Cliente";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  IconButton,
} from "@mui/material";
import { Trash, Pencil } from "lucide-react";

interface CustomerTableProps {
  customers: Cliente[];
  onEdit: (client: Cliente) => void;
  onDelete: (clientId: number) => void;
}

const CustomerTable = ({ customers, onEdit, onDelete }: CustomerTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: "4px 8px" }}>ID</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Nombre</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Apellido</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Teléfono</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Documento</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Correo</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((client) => (
            <TableRow key={client.idCliente}>
              <TableCell sx={{ padding: "4px 8px" }}>{client.idCliente}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{client.nombreCliente}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{client.apellidoCliente}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{client.telefonoCliente}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{client.documentoIdentidad}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{client.correoElectronicoCliente}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>
                <IconButton
                  color="secondary"
                  onClick={() => onEdit(client)}
                  sx={{ padding: "4px", height: "25px", width: "25px" }}
                >
                  <Pencil fontSize="small" />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDelete(client.idCliente)}
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

export default CustomerTable;
