'use client';

import React, {useEffect} from 'react';
import {Button, Card, FormControl, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {Search} from "lucide-react";
import {Filter} from "@/app/dashboard/page";
import moment, {Moment} from "moment";

interface SearchFlightsProps {
    onDataChange: (filter: Filter) => void;
    onSearch: () => void;
}

const SearchFlights = ({ onDataChange, onSearch }: SearchFlightsProps) => {
    const [filter, setFilter] = React.useState({
        origin: '',
        destination: '',
        date: moment(),
        passengers: 1
    });

    useEffect(() => {
        onDataChange(filter);
    }, [filter, onDataChange]);

    const handleChange = (key: string, value: string | Moment | null) => {
        setFilter({
            ...filter,
            [key]: value
        });
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
                        onChange={(e) => handleChange('origin', e.target.value)}
                        value={filter.origin}
                    />
                </FormControl>
                <FormControl className="col-span-1">
                    <TextField
                        id="destination"
                        label="Destino"
                        variant="outlined"
                        size="small"
                        onChange={(e) => handleChange('destination', e.target.value)}
                        value={filter.destination}
                    />
                </FormControl>
                <FormControl className="col-span-1">
                    <DatePicker
                        label="Fecha"
                        slotProps={{ textField: { size: 'small'}}}
                        value={moment(filter.date)}
                        onChange={(date) => handleChange('date', date)}
                    />
                </FormControl>
                <FormControl className="col-span-1">
                    <TextField
                        id="passengers"
                        label="Pasajeros"
                        variant="outlined"
                        size="small"
                        type="number"
                        onChange={(e) => handleChange('passengers', e.target.value)}
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