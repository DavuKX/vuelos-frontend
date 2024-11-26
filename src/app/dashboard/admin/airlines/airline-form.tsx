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
import { Aerolinea } from "@/interfaces/Aerolinea";

interface AerolineaFormProps {
  aerolinea?: Aerolinea | null;
  onClose: () => void;
  onSubmit: () => void;
}

interface AirlineFormData {
  codigoAerolinea: string;
  nombreAerolinea: string;
  paisOrigenAerolinea: string;
}

const AirlineForm = ({
  aerolinea,
  onClose,
  onSubmit,
}: AerolineaFormProps) => {
  const [formData, setFormData] = useState<AirlineFormData>({
    codigoAerolinea: aerolinea?.codigoAerolinea || "",
    nombreAerolinea: aerolinea?.nombreAerolinea || "",
    paisOrigenAerolinea: aerolinea?.paisOrigenAerolinea || "",
  });

  const handleChange = (field: keyof AirlineFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (aerolinea) {
        await axiosInstance.put(`/aerolineas/${aerolinea.idAerolinea}`, formData);
      } else {
        await axiosInstance.post("/aerolineas", formData);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving airline:", error);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {aerolinea ? "Editar Aerolínea" : "Crear Aerolínea"}
      </DialogTitle>
      <DialogContent className="mt-2">
        <TextField
          fullWidth
          label="Código de Aerolínea"
          value={formData.codigoAerolinea}
          onChange={handleChange("codigoAerolinea")}
          sx={{ marginBottom: "16px", marginTop: "8px" }}
        />
        <TextField
          fullWidth
          label="Nombre de Aerolínea"
          value={formData.nombreAerolinea}
          onChange={handleChange("nombreAerolinea")}
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          fullWidth
          label="País de Origen"
          value={formData.paisOrigenAerolinea}
          onChange={handleChange("paisOrigenAerolinea")}
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

export default AirlineForm;
