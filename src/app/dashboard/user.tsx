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

export async function User() {
    let user = null;

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
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuSeparator/>
                    {user ? (
                        <DropdownMenuItem>
                            <form
                                action={async () => {
                                    'use server';
                                }}
                            >
                                <button type="submit">Sign Out</button>
                            </form>
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem>
                            <Link href="auth/login">Sign In</Link>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
