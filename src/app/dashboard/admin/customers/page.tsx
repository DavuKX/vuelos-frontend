'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from "@/services/axiosInstance";
import { Button, TextField, Container, Typography, Pagination } from "@mui/material";
import CustomerTable from "./customer-table";
import CustomerForm from "./customer-form";
import { Cliente } from "@/interfaces/Cliente";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [searchDocument, setSearchDocument] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingClient, setEditingClient] = useState<Cliente | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);

  const paginatedClients = clients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const loadClients = async () => {
    try {
      const response = await axiosInstance.get("/clientes");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchDocument) {
      await loadClients();
      return;
    }

    try {
      const response = await axiosInstance.get(`/clientes/documento/${searchDocument}`);
      setClients(response.data ? [response.data] : []);
    } catch (error) {
      console.error("Error fetching client by document ID:", error);
    }
  };

  const handleEdit = (client: Cliente) => {
    setEditingClient(client);
    setIsEditing(true);
  };

  const handleDelete = async (clientId: number) => {
    try {
      await axiosInstance.delete(`/clientes/${clientId}`);
      await loadClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleFormSubmit = async () => {
    await loadClients();
    setIsEditing(false);
    setEditingClient(null);
  };

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" gutterBottom>
        Gestión de Clientes
      </Typography>

      <div className="flex gap-4 mb-4">
        <TextField
          label="Buscar por documento"
          value={searchDocument}
          onChange={(e) => setSearchDocument(e.target.value)}
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
          Crear Cliente
        </Button>
      </div>

      <CustomerTable
        customers={paginatedClients}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
        <Pagination
          count={Math.ceil(clients.length / pageSize)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="secondary"
        />
      </div>

      {isEditing && (
        <CustomerForm
          client={editingClient}
          onClose={() => setIsEditing(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </Container>
  );
}
