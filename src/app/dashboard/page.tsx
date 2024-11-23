'use client';
import SearchFlights from "@/app/dashboard/search-flights";
export interface Filter {
    origin: string;
    destiny: string;
    date: string;
    passengers: number;
}

export default function HomePage() {
    const filters: Filter = {
        origin: '',
        destiny: '',
        date: '',
        passengers: 1
    };

    const onDataChange = (filter: Filter) => {
        filters.origin = filter.origin;
        filters.destiny = filter.destiny;
        filters.date = filter.date;
        filters.passengers = filter.passengers;
    }

    const onSearch = async () => {
        console.log(filters);
    }

    return (
        <>
            <SearchFlights onDataChange={onDataChange} onSearch={onSearch} />
        </>
    );
}
