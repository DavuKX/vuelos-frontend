import React from 'react';
import DashboardLayout from "@/app/dashboard/layout";

const Layout = ({children}: { children: React.ReactNode; }) => {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
};

export default Layout;