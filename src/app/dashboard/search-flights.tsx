'use client';

import React from 'react';
import {Button, Card, FormControl, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {Search} from "lucide-react";
import {Filter} from "@/app/dashboard/page";

interface SearchFlightsProps {
    onDataChange: (filter: Filter) => void;
    onSearch: () => void;
}

const SearchFlights = ({ onDataChange, onSearch }: SearchFlightsProps) => {
    const [filter, setFilter] = React.useState({
        origin: '',
        destiny: '',
        date: '',
        passengers: 1
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({
            ...filter,
            [event.target.id]: event.target.value
        });

        onDataChange(filter);
    };

    return (
        <Card className="p-4">
            <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">
                Vuelos
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <FormControl className="col-span-1">
                    <TextField
                        id="origin"
                        label="Origen"
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                        value={filter.origin}
                    />
                </FormControl>
                <FormControl className="col-span-1">
                    <TextField
                        id="destiny"
                        label="Destino"
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                        value={filter.destiny}
                    />
                </FormControl>
                <FormControl className="col-span-1">
                    <DatePicker
                        label="Fecha"
                        slotProps={{ textField: { size: 'small'}}}
                    />
                </FormControl>
                <FormControl className="col-span-1">
                    <TextField
                        id="passengers"
                        label="Pasajeros"
                        variant="outlined"
                        size="small"
                        type="number"
                        onChange={handleChange}
                        value={filter.passengers}
                    />
                </FormControl>
                <FormControl className="col-span-2">
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<Search/>} onClick={onSearch}
                    >
                        Buscar
                    </Button>
                </FormControl>
            </div>
        </Card>
    );
};

export default SearchFlights;