'use client';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {signOut} from "@/actions/auth";
import {getCookie} from "@/lib/cookieUtils";

export function User() {
    const user = getCookie('authUsername');

    return (
        <div className="relative ml-auto flex-1 md:grow-0">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Image
                            src={'/placeholder-user.jpg'}
                            width={36}
                            height={36}
                            alt="Avatar"
                            className="overflow-hidden rounded-full"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuLabel>{user ? user : 'My Account'}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuSeparator/>
                    {user ? (
                        <DropdownMenuItem>
                            <button onClick={signOut}>Cerrar sesión</button>
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem>
                            <Link href="auth/login">Iniciar sesión</Link>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
