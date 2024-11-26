'use client';

import { signup } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { router } from "next/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";

const Page = () => {
    const [state, action] = React.useActionState(signup, undefined);

    useEffect(() => {
        if (state?.success) {
            toast.success("Registro exitoso, ya puedes iniciar sesión");
            redirect("/auth/login");
        }
    }, [state?.success, router]);

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        lastName: '',
        identification: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <form className="bg-gray-50 font-[sans-serif]" action={action}>
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Sign Up</h2>
                        <div className="mt-8 space-y-4">
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Usuario</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Ingrese usuario"
                                    />
                                </div>
                                {state?.errors?.username && <p className='text-red-500'>{state.errors.username}</p>}
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Nombre</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Ingrese Nombre"
                                    />
                                </div>
                                {state?.errors?.name && <p className='text-red-500'>{state.errors.name}</p>}
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Apellido</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Ingrese Apellido"
                                    />
                                </div>
                                {state?.errors?.lastName && <p className='text-red-500'>{state.errors.lastName}</p>}
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Cedula</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="identification"
                                        type="text"
                                        value={formData.identification}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Ingrese Cedula"
                                    />
                                </div>
                                {state?.errors?.identification && <p className='text-red-500'>{state.errors.identification}</p>}
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Dirección</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="address"
                                        type="text"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Ingrese Direcciíon"
                                    />
                                </div>
                                {state?.errors?.address && <p className='text-red-500'>{state.errors.address}</p>}
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Telefono</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="phone"
                                        type="text"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Ingrese Telefono"
                                    />
                                </div>
                                {state?.errors?.phone && <p className='text-red-500'>{state.errors.phone}</p>}
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="email"
                                        type="text"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Ingrese email"
                                    />
                                </div>
                                {state?.errors?.email && <p className='text-red-500'>{state.errors.email}</p>}
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Contraseña</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Ingrese contraseña"
                                    />
                                </div>
                                {state?.errors?.password && (
                                    <div className='text-red-500'>
                                        <p>Password must:</p>
                                        <ul>
                                            {state.errors.password.map((error: string) => (
                                                <li key={error}>- {error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Confirmar Contraseña</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="confirm_password"
                                        type="password"
                                        value={formData.confirm_password}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Ingrese contraseña"
                                    />
                                </div>
                            </div>
                            <div className="!mt-8">
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none"
                                >
                                    Registrarse
                                </Button>
                            </div>
                            <p className="text-gray-800 text-sm !mt-8 text-center">¿Ya tienes una cuenta?
                                <Link
                                    href={"/auth/login"}
                                    className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                                >
                                    Inicia sesión
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Page;
