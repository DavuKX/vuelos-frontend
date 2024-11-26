"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axiosInstance from "@/services/axiosInstance";
import { Cliente } from "@/interfaces/Cliente";

interface ClientFormProps {
  client?: Cliente | null;
  onClose: () => void;
  onSubmit: () => void;
}

interface ClientFormData {
  nombreCliente: string;
  apellidoCliente: string;
  telefonoCliente: string;
  documentoIdentidad: string;
  correoElectronicoCliente: string;
}

const CustomerForm = ({ client, onClose, onSubmit }: ClientFormProps) => {
  const [formData, setFormData] = useState<ClientFormData>({
    nombreCliente: client?.nombreCliente || "",
    apellidoCliente: client?.apellidoCliente || "",
    telefonoCliente: client?.telefonoCliente || "",
    documentoIdentidad: client?.documentoIdentidad || "",
    correoElectronicoCliente: client?.correoElectronicoCliente || "",
  });

  const handleChange = (field: keyof ClientFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (client) {
        await axiosInstance.put(`/clientes/${client.idCliente}`, formData);
      } else {
        await axiosInstance.post("/clientes", formData);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving client:", error);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{client ? "Editar Cliente" : "Crear Cliente"}</DialogTitle>
      <DialogContent className="mt-2">
        <TextField
          fullWidth
          label="Nombre"
          value={formData.nombreCliente}
          onChange={handleChange("nombreCliente")}
          sx={{ marginBottom: "16px", marginTop: "8px" }}
        />
        <TextField
          fullWidth
          label="Apellido"
          value={formData.apellidoCliente}
          onChange={handleChange("apellidoCliente")}
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          fullWidth
          label="Documento"
          value={formData.documentoIdentidad}
          onChange={handleChange("documentoIdentidad")}
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          fullWidth
          label="Correo Electrónico"
          type="email"
          value={formData.correoElectronicoCliente}
          onChange={handleChange("correoElectronicoCliente")}
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          fullWidth
          label="Teléfono"
          type="tel"
          value={formData.telefonoCliente}
          onChange={handleChange("telefonoCliente")}
          sx={{ marginBottom: "16px" }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "10px 24px 15px 0" }}>
        <Button
          size="small"
          sx={{ height: "36px", padding: "0 12px" }}
          color="secondary"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          size="small"
          sx={{ height: "36px", padding: "0 12px" }}
          variant="contained"
          color="secondary"
          onClick={handleSave}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerForm;
