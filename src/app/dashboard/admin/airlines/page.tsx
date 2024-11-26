'use client';
import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, Pagination } from "@mui/material";
import axiosInstance from "@/services/axiosInstance";
import AirlineTable from "./airline-table";
import AirlineForm from "./airline-form"; 
import { Aerolinea } from "@/interfaces/Aerolinea";


export default function AdminAirlinesPage() {
  const [airlines, setAirlines] = useState<Aerolinea[]>([]);
  const [searchId, setSearchId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingAirline, setEditingAirline] = useState<Aerolinea | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);

  const paginatedAirlines = airlines.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const loadAirlines = async () => {
    try {
      const response = await axiosInstance.get("/aerolineas");
      setAirlines(response.data);
    } catch (error) {
      console.error("Error fetching airlines:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchId) {
      await loadAirlines();
      return;
    }

    try {
      const response = await axiosInstance.get(`/aerolineas/${searchId}`);
      setAirlines(response.data ? [response.data] : []);
    } catch (error) {
      console.error("Error fetching airline by ID:", error);
    }
  };

  const handleEdit = (airline: Aerolinea) => {
    setEditingAirline(airline);
    setIsEditing(true);
  };

  const handleDelete = async (airlineId: number) => {
    try {
      await axiosInstance.delete(`/aerolineas/${airlineId}`);
      await loadAirlines();
    } catch (error) {
      console.error("Error deleting airline:", error);
    }
  };

  const handleFormSubmit = async () => {
    await loadAirlines();
    setIsEditing(false);
    setEditingAirline(null);
  };

  useEffect(() => {
    loadAirlines();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" gutterBottom>
        Gestión de Aerolíneas
      </Typography>

      <div className="flex gap-4 mb-4">
        <TextField
          label="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          color="secondary"
          size="small"
          sx={{
            ".MuiInputLabel-root": { fontSize: "14px", textAlign: "center" },
            ".MuiInputBase-root": { height: "36px" },
          }}
        />
        <Button
          size="small"
          sx={{ height: "36px", padding: "0 12px" }}
          variant="contained"
          color="secondary"
          onClick={handleSearch}
        >
          Buscar
        </Button>
        <Button
          size="small"
          sx={{ height: "36px", padding: "0 12px" }}
          variant="contained"
          color="secondary"
          onClick={() => setIsEditing(true)}
        >
          Crear Aerolínea
        </Button>
      </div>

      <AirlineTable
        aerolineas={paginatedAirlines}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
        <Pagination
          count={Math.ceil(airlines.length / pageSize)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="secondary"
        />
      </div>

      {isEditing && (
        <AirlineForm
          aerolinea={editingAirline}
          onClose={() => setIsEditing(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </Container>
  );
}
