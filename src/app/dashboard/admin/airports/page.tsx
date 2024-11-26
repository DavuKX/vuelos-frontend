'use client';
import { Aeropuerto } from '@/interfaces/Aeropuerto';
import axiosInstance from "@/services/axiosInstance";
import { Button, Container, Pagination, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AirportForm from "./airport-form";
import AirportTable from "./airport-table";

export default function AdminAirportsPage() {
  const [airports, setAirports] = useState<Aeropuerto[]>([]);
  const [searchId, setSearchId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingAirport, setEditingAirport] = useState<Aeropuerto | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);

  const paginatedAirports = airports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const loadAirports = async () => {
    try {
      const response = await axiosInstance.get("/aeropuertos");
      setAirports(response.data);
    } catch (error) {
      console.error("Error fetching airports:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchId) {
      await loadAirports();
      return;
    }

    try {
      const response = await axiosInstance.get('/aeropuertos/search', {
        params: { name: searchId }
      });
      setAirports(response.data ? response.data : []);
    } catch (error) {
      toast.error("Aeropuerto no encontrado");
    }
  };

  const handleEdit = (airport: Aeropuerto) => {
    setEditingAirport(airport);
    setIsEditing(true);
  };

  const handleDelete = async (airportId: number) => {
    try {
      await axiosInstance.delete(`/aeropuertos/${airportId}`);
      await loadAirports();
    } catch (error) {
      console.error("Error deleting airport:", error);
    }
  };

  const handleFormSubmit = async () => {
    await loadAirports();
    setIsEditing(false);
    setEditingAirport(null);
  };

  useEffect(() => {
    loadAirports();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" gutterBottom>
        Gestión de aeropuertos
      </Typography>

      <div className="flex gap-4 mb-4">
        <TextField
          label="Buscar"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          color="secondary"
          size="small"
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
          Crear Aeropuerto
        </Button>
      </div>

      <AirportTable
        airports={paginatedAirports}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
        <Pagination
          count={Math.ceil(airports.length / pageSize)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="secondary"
        />
      </div>

      {isEditing && (
        <AirportForm
          airport={editingAirport}
          onClose={() => setIsEditing(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </Container>
  );
}