'use client';

import { Vuelo } from "@/interfaces/Vuelo";
import axiosInstance from "@/services/axiosInstance";
import { Button, Container, Pagination, TextField, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import FlightForm from "./flight-form";
import FlightTable from "./flight-table";

export default function AdminFlightsPage() {
  const [flights, setFlights] = useState<Vuelo[]>([]);
  const [searchId, setSearchId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingFlight, setEditingFlight] = useState<Vuelo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);

  const paginatedFlights = flights.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const loadFlights = async () => {
    try {
      const response = await axiosInstance.get("/vuelos/all");
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchId) {
      await loadFlights();
      return;
    }

    try {
      const response = await axiosInstance.get(`/vuelos/${searchId}`);
      setFlights(response.data ? [response.data] : []);
    } catch (error) {
      toast.error("Vuelo no encontrado");
    }
  };

  const handleEdit = (flight: Vuelo) => {
    setEditingFlight(flight);
    setIsEditing(true);
  };

  const handleDelete = async (flightId: string) => {
    try {
      await axiosInstance.delete(`/vuelos/${flightId}`);
      await loadFlights();
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  const handleFormSubmit = async () => {
    await loadFlights();
    setIsEditing(false);
    setEditingFlight(null);
  };

  useEffect(() => {
    loadFlights();
  }, []);

  return (

    <Container maxWidth="lg" >
      <Typography variant="h4" component="h2" gutterBottom>
        Gestión de vuelos
      </Typography>

      <div className="flex gap-4 mb-4">
        <TextField
          label="Buscar por ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} color="secondary" size="small"
          sx={{
            ".MuiInputLabel-root": {
              fontSize: "14px",
              textAlign: "center",
            },
            ".MuiInputBase-root": {
              height: "36px"
            }
          }}
        />
        <Button size="small" sx={{ height: "36px", padding: "0 12px" }} variant="contained" color="secondary" onClick={handleSearch}>
          Buscar
        </Button>
        <Button size="small" sx={{ height: "36px", padding: "0 12px" }} variant="contained" color="secondary" onClick={() => setIsEditing(true)}>
          Crear Vuelo
        </Button>
      </div>

      <FlightTable
        flights={paginatedFlights}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
        <Pagination
          count={Math.ceil(flights.length / pageSize)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="secondary"
        />
      </div>



      {isEditing && (
        <FlightForm
          flight={editingFlight}
          onClose={() => setIsEditing(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </Container>
  );
}
