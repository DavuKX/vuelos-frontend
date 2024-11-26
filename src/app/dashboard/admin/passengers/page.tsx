'use client';
import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Pagination } from '@mui/material';
import axiosInstance from '@/services/axiosInstance';
import PassengerTable from './passenger-table';
import PassengerForm from './passenger-form';
import { Pasajero } from '@/interfaces/Pasajero';

export default function AdminPassengersPage() {
  const [passengers, setPassengers] = useState<Pasajero[]>([]);
  const [searchId, setSearchId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState<Pasajero | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);

  const paginatedPassengers = passengers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const loadPassengers = async () => {
    try {
      const response = await axiosInstance.get('/pasajeros');
      setPassengers(response.data);
    } catch (error) {
      console.error('Error fetching passengers:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchId) {
      await loadPassengers();
      return;
    }

    try {
      const response = await axiosInstance.get(`/pasajeros/${searchId}`);
      setPassengers(response.data ? [response.data] : []);
    } catch (error) {
      console.error('Error fetching passenger by ID:', error);
    }
  };

  const handleEdit = (passenger: Pasajero) => {
    setEditingPassenger(passenger);
    setIsEditing(true);
  };

  const handleDelete = async (passengerId: number) => {
    try {
      await axiosInstance.delete(`/pasajeros/${passengerId}`);
      await loadPassengers();
    } catch (error) {
      console.error('Error deleting passenger:', error);
    }
  };

  const handleFormSubmit = async () => {
    await loadPassengers();
    setIsEditing(false);
    setEditingPassenger(null);
  };

  useEffect(() => {
    loadPassengers();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" gutterBottom>
        Gestión de Pasajeros
      </Typography>

      <div className="flex gap-4 mb-4">
        <TextField
          label="Buscar por ID"
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
              height: "36px",
            },
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
          Crear Pasajero
        </Button>
      </div>

      <PassengerTable
        pasajeros={paginatedPassengers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
        <Pagination
          count={Math.ceil(passengers.length / pageSize)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="secondary"
        />
      </div>

      {isEditing && (
        <PassengerForm
          passenger={editingPassenger}
          onClose={() => setIsEditing(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </Container>
  );
}
