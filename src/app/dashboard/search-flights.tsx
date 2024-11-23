import React from 'react';
import {Button, Card, FormControl, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {Search} from "lucide-react";

const SearchFlights = () => {
    return (
        <Card className="p-4">
            <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">
                Vuelos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormControl className="col-span-2">
                    <TextField
                        id="origin"
                        label="Origen"
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        id="destiny"
                        label="Destino"
                        variant="outlined"
                        size="small"
                    />
                </FormControl>
                <FormControl className="col-span-2">
                    <DatePicker label="Ida" slotProps={{ textField: { size: 'small'}}} />
                    <TextField
                        id="passengers"
                        label="Pasajeros"
                        variant="outlined"
                        size="small"
                        type="number"
                    />
                </FormControl>
                <FormControl className="col-span-4">
                    <Button variant="outlined" color="secondary" startIcon={<Search/>}>
                        Buscar
                    </Button>
                </FormControl>
            </div>
        </Card>
    );
};

export default SearchFlights;