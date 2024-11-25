'use client';
import Flights from "@/app/dashboard/flights";
import SearchFlights from "@/app/dashboard/search-flights";
import { Vuelo } from "@/interfaces/Vuelo";
import axiosInstance from "@/services/axiosInstance";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export interface Filter {
    origin: string;
    destination: string;
    date: Moment | null;
    passengers: number;
}

export default function HomePage() {
    const [flights, setFlights] = useState<Vuelo[]>([]);

    const filters: Filter = {
        origin: '',
        destination: '',
        date: moment(),
        passengers: 1
    };

    useEffect(() => {
        loadFlights().then(() => console.log('Flights loaded'));
    }, []);

    const loadFlights = async () => {
        const response: any = await axiosInstance.get('/vuelos', {
            params: {
                origin: filters.origin,
                destination: filters.destination,
                date: filters.date?.format('YYYY-MM-DD'),
                passengers: filters.passengers,
                size: 1000
            }
        });
        setFlights(response.data);
    }

    const onDataChange = (filter: Filter) => {
        filters.origin = filter.origin;
        filters.destination = filter.destination;
        filters.date = filter.date;
        filters.passengers = filter.passengers;
    }

    const onSearch = async () => {
        if (!filters.origin || !filters.destination || !filters.date) {
            toast.error('Por favor, complete todos los campos');
            return;
        }

        await loadFlights();
    }

    return (
        <>
            <SearchFlights onDataChange={onDataChange} onSearch={onSearch} />
            <Flights flights={flights} />
        </>
    );
}
