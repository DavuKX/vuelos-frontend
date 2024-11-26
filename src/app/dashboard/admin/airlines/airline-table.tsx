import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Pencil, Trash } from "lucide-react";
import { Aerolinea } from "@/interfaces/Aerolinea";

interface AerolineaTableProps {
  aerolineas: Aerolinea[];
  onEdit: (aerolinea: Aerolinea) => void;
  onDelete: (aerolineaId: number) => void;
}

const AirlineTable = ({
  aerolineas,
  onEdit,
  onDelete,
}: AerolineaTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: "4px 8px" }}>ID</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Código</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Nombre</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>País de Origen</TableCell>
            <TableCell sx={{ padding: "4px 8px" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {aerolineas.map((aerolinea) => (
            <TableRow key={aerolinea.idAerolinea}>
              <TableCell sx={{ padding: "4px 8px" }}>{aerolinea.idAerolinea}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{aerolinea.codigoAerolinea}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{aerolinea.nombreAerolinea}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>{aerolinea.paisOrigenAerolinea}</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>
                <IconButton
                  color="secondary"
                  onClick={() => onEdit(aerolinea)}
                  sx={{ padding: "4px", height: "25px", width: "25px" }}
                >
                  <Pencil fontSize="small" />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDelete(aerolinea.idAerolinea)}
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

export default AirlineTable;
