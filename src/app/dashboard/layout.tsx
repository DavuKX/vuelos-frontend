import Link from 'next/link';
import {
    Home,
    Package2,
    PanelLeft,
    ShoppingCart,
    Plane,
    Users,
    Building,
    UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cookies } from 'next/headers';
import { User } from './user';
import Providers from './providers';
import { NavItem } from './nav-item';
import React from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <main className="flex min-h-screen w-full flex-col bg-muted/40">
                <DesktopNav />
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                        <MobileNav />
                        <User />
                    </header>
                    <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
                        {children}
                    </main>
                </div>
            </main>
        </Providers>
    );
}

async function DesktopNav() {
    const admin = (await cookies()).get('authRoles')?.value.includes('ROLE_ADMIN');
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="/dashboard"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Home className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Dashboard</span>
                </Link>

                <NavItem href="/reservations" label="Ordenes">
                    <ShoppingCart className="h-5 w-5" />
                </NavItem>

                {admin && (
                    <>
                        <NavItem href="/dashboard/admin/airlines" label="Aerolíneas">
                            <Plane className="h-5 w-5" />
                        </NavItem>
                        <NavItem href="/dashboard/admin/airports" label="Aeropuertos">
                            <Building className="h-5 w-5" />
                        </NavItem>
                        <NavItem href="/dashboard/admin/customers" label="Clientes">
                            <Users className="h-5 w-5" />
                        </NavItem>
                        <NavItem href="/dashboard/admin/flights" label="Vuelos">
                            <Package2 className="h-5 w-5" />
                        </NavItem>
                        <NavItem href="/dashboard/admin/passengers" label="Pasajeros">
                            <UserPlus className="h-5 w-5" />
                        </NavItem>
                    </>
                )}
            </nav>
        </aside>
    );
}

async function MobileNav() {
    const admin = (await cookies()).get('authRoles')?.value.includes('ROLE_ADMIN');
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href="/dashboard"
                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    >
                        <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                        <span className="sr-only">Dashboard</span>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        Orders
                    </Link>

                    {admin && (
                        <>
                            <Link href="/dashboard/admin/airlines" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                                <Plane className="h-5 w-5" />
                                Airlines
                            </Link>
                            <Link href="/dashboard/admin/airports" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                                <Building className="h-5 w-5" />
                                Airports
                            </Link>
                            <Link href="/dashboard/admin/customers" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                                <Users className="h-5 w-5" />
                                Customers
                            </Link>
                            <Link href="/dashboard/admin/flights" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                                <Package2 className="h-5 w-5" />
                                Flights
                            </Link>
                            <Link href="/dashboard/admin/passengers" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                                <UserPlus className="h-5 w-5" />
                                Passengers
                            </Link>
                        </>
                    )}
                </nav>
            </SheetContent>
        </Sheet>
    );
}