'use client';

import {TooltipProvider} from '@/components/ui/tooltip';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

export default function Providers({children}: { children: React.ReactNode }) {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <TooltipProvider>
                {children}
            </TooltipProvider>
        </LocalizationProvider>
);

}
