'use client';

import React, { useState } from "react";
import { Vuelo } from "@/interfaces/Vuelo";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from "@mui/material";
import axiosInstance from "@/services/axiosInstance";

interface FlightFormProps {
  flight?: Vuelo | null;
  onClose: () => void;
  onSubmit: () => void;
}

interface FlightFormData {
  fechaSalidaVuelo: string;
  horaSalidaVuelo: string;
  duracionMinutosVuelo: number;
  precioVuelo: number;
  capacidadVuelo: number;
  aeropuertoOrigenId: number;
  aeropuertoDestinoId: number;
  aerolineaId: number;
}

const FlightForm = ({ flight, onClose, onSubmit }: FlightFormProps) => {
  const [formData, setFormData] = useState<FlightFormData>({
    fechaSalidaVuelo: flight?.fechaSalidaVuelo || "",
    horaSalidaVuelo: flight?.horaSalidaVuelo || "",
    duracionMinutosVuelo: flight?.duracionMinutosVuelo || 0,
    precioVuelo: flight?.precioVuelo || 0,
    capacidadVuelo: flight?.capacidadVuelo || 0,
    aeropuertoOrigenId: flight?.aeropuertoOrigen.idAeropuerto || 0,
    aeropuertoDestinoId: flight?.aeropuertoDestino.idAeropuerto || 0,
    aerolineaId: flight?.aerolinea.idAerolinea || 0,
  });

  const handleChange = (field: keyof FlightFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      if (flight) {
        await axiosInstance.put(`/vuelos/${flight.idVuelo}`, formData);
      } else {
        await axiosInstance.post("/vuelos", formData);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving flight:", error);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {flight ? "Editar vuelo" : "Crear vuelo"}
      </DialogTitle>
      <DialogContent className="mt-2">
      <TextField
        fullWidth
        label="Fecha de Salida"
        type="date"
        value={formData.fechaSalidaVuelo}
        onChange={handleChange("fechaSalidaVuelo")}
        sx={{ marginBottom: "10px", marginTop: "8px" }}
        InputLabelProps={{ shrink: true }}
        />
      <TextField
        fullWidth
        label="Hora de Salida"
        type="time"
        value={formData.horaSalidaVuelo}
        onChange={handleChange("horaSalidaVuelo")}
        sx={{ marginBottom: "16px" }}
        InputLabelProps={{ shrink: true }}
        />
      <TextField
        fullWidth
        label="Duración (minutos)"
        type="number"
        value={formData.duracionMinutosVuelo}
        onChange={handleChange("duracionMinutosVuelo")}
        sx={{ marginBottom: "16px" }}
        />
      <TextField
        fullWidth
        label="Precio"
        type="number"
        value={formData.precioVuelo}
        onChange={handleChange("precioVuelo")}
        sx={{ marginBottom: "16px" }}
        />
      <TextField
        fullWidth
        label="Capacidad"
        type="number"
        value={formData.capacidadVuelo}
        onChange={handleChange("capacidadVuelo")}
        sx={{ marginBottom: "16px" }}
        />
      <TextField
        fullWidth
        label="ID Aeropuerto Origen"
        type="number"
        value={formData.aeropuertoOrigenId}
        onChange={handleChange("aeropuertoOrigenId")}
        sx={{ marginBottom: "16px" }}
        />
      <TextField
        fullWidth
        label="ID Aeropuerto Destino"
        type="number"
        value={formData.aeropuertoDestinoId}
        onChange={handleChange("aeropuertoDestinoId")}
        sx={{ marginBottom: "16px" }}
        />
      <TextField
        fullWidth
        label="ID Aerolínea"
        type="number"
        value={formData.aerolineaId}
        onChange={handleChange("aerolineaId")}
        sx={{ marginBottom: "16px" }}
        />

      </DialogContent>
      <DialogActions sx={{ padding: "10px 24px 15px 0"}}>
        <Button size="small" sx={{ height: "36px", padding: "0 12px" }} color="secondary" onClick={onClose}>Cancelar</Button>
        <Button size="small" sx={{ height: "36px", padding: "0 12px" }} variant="contained" color="secondary" onClick={handleSave}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FlightForm;