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
import { Pasajero } from "@/interfaces/Pasajero";

interface PassengerFormProps {
  passenger?: Pasajero | null;
  onClose: () => void;
  onSubmit: () => void;
}

interface PassengerFormData {
  nombrePasajero: string;
  apellidoPasajero: string;
  documentoIdentidadPasajero: string;
}

const PassengerForm = ({ passenger, onClose, onSubmit }: PassengerFormProps) => {
  const [formData, setFormData] = useState<PassengerFormData>({
    nombrePasajero: passenger?.nombrePasajero || "",
    apellidoPasajero: passenger?.apellidoPasajero || "",
    documentoIdentidadPasajero: passenger?.documentoIdentidadPasajero || "",
  });

  const handleChange = (field: keyof PassengerFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (passenger) {
        await axiosInstance.put(`/pasajeros/${passenger.idPasajero}`, formData);
      } else {
        await axiosInstance.post("/pasajeros", formData);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving passenger:", error);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{passenger ? "Editar Pasajero" : "Crear Pasajero"}</DialogTitle>
      <DialogContent className="mt-2">
        <TextField
          fullWidth
          label="Nombre"
          value={formData.nombrePasajero}
          onChange={handleChange("nombrePasajero")}
          sx={{ marginBottom: "16px", marginTop: "8px" }}
        />
        <TextField
          fullWidth
          label="Apellido"
          value={formData.apellidoPasajero}
          onChange={handleChange("apellidoPasajero")}
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          fullWidth
          label="Documento"
          value={formData.documentoIdentidadPasajero}
          onChange={handleChange("documentoIdentidadPasajero")}
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

export default PassengerForm;
