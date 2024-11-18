'use client';

import React, {useEffect} from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {login} from "@/actions/auth";
import {toast} from "react-toastify";
import {redirect} from "next/navigation";
import {router} from "next/client";

const LoginPage = () => {
    const [state, action] = React.useActionState(login, undefined);

    useEffect(() => {
        if (state?.success) {
            toast.success("Inicio de sesión exitoso");
            redirect("/dashboard");
        }
    }, [state?.success, router]);

    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">

                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Sign In</h2>
                        <form className="mt-8 space-y-4" action={action}>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Usuario</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="username"
                                        type="text"
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                       placeholder="Ingrese usuario"
                                    />
                                </div>
                                {state?.errors?.username && <p className='text-red-500'>{state.errors.username}</p>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Contraseña</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Ingrese contraseña"
                                    />
                                </div>
                                {state?.errors?.password && <p className='text-red-500'>{state.errors.password}</p>}
                            </div>

                            <div className="!mt-8">
                                <Button type="submit" variant="secondary" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none">Sign in</Button>
                            </div>
                            <p className="text-gray-800 text-sm !mt-8 text-center">¿No tienes una cuenta?
                                <Link href={"/auth/signup"} className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"> Regístrate aquí</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;