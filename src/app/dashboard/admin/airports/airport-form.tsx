'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import axiosInstance from "@/services/axiosInstance";
import { Aeropuerto } from '@/interfaces/Aeropuerto';

interface AirportFormProps {
  airport?: Aeropuerto | null;
  onClose: () => void;
  onSubmit: () => void;
}

interface AirportFormData {
  nombreAeropuerto: string;
  ciudadAeropuerto: string;
  paisAeropuerto: string;
}

const AirportForm = ({ airport, onClose, onSubmit }: AirportFormProps) => {
  const [formData, setFormData] = useState<AirportFormData>({
    nombreAeropuerto: airport?.nombreAeropuerto || "",
    ciudadAeropuerto: airport?.ciudadAeropuerto || "",
    paisAeropuerto: airport?.paisAeropuerto || "",
  });

  const handleChange = (field: keyof AirportFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      if (airport) {
        await axiosInstance.put(`/aeropuertos/${airport.idAeropuerto}`, formData);
      } else {
        await axiosInstance.post("/aeropuertos", formData);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving airport:", error);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {airport ? "Editar aeropuerto" : "Crear aeropuerto"}
      </DialogTitle>
      <DialogContent className="mt-2">
        <TextField
          fullWidth
          label="Nombre del Aeropuerto"
          value={formData.nombreAeropuerto}
          onChange={handleChange("nombreAeropuerto")}
          sx={{ marginBottom: "16px", marginTop: "8px" }}
        />
        <TextField
          fullWidth
          label="Ciudad"
          value={formData.ciudadAeropuerto}
          onChange={handleChange("ciudadAeropuerto")}
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          fullWidth
          label="País"
          value={formData.paisAeropuerto}
          onChange={handleChange("paisAeropuerto")}
          sx={{ marginBottom: "16px" }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "10px 24px 15px 0"}}>
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
export default AirportForm;
