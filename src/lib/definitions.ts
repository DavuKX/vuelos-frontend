import { z } from "zod";

export const SignupFormSchema = z
    .object({
        username: z
            .string()
            .min(2, { message: "Usuario debe tener al menos 2 caracteres." })
            .trim(),
        name: z
            .string()
            .min(2, { message: "Nombre debe tener al menos 2 caracteres." }),
        lastName: z
            .string()
            .min(2, { message: "Apellido debe tener al menos 2 caracteres." }),
        identification: z
            .string()
            .min(2, { message: "Celular debe tener al menos 2 caracteres." }),
        address: z.string(),
        phone: z.string(),
        email: z
            .string()
            .email({ message: "Correo electrónico inválido." })
            .trim(),
        password: z
            .string()
            .min(8, { message: "Contraseña debe tener al menos 8 caracteres." })
            .regex(/[a-zA-Z]/, { message: "Contener al menos una letra." })
            .regex(/[0-9]/, { message: "Contener al menos un número." })
            .regex(/[^a-zA-Z0-9]/, {
                message: "Contener al menos un caracter especial.",
            })
            .trim(),
        confirmPassword: z.string(),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                message: "Las contraseñas no coinciden.",
                code: "custom",
                path: ["confirmPassword"],
            });
        }
    });

export type FormState =
    | {
          errors?: {
              username?: string[];
              email?: string[];
              password?: string[];
              confirmPassword?: string[];
          };
          message?: string;
      }
    | undefined;

export const LoginFormSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export type LoginFormState =
    | {
          errors?: {
              username?: string[];
              password?: string[];
          };
          message?: string;
      }
    | undefined;
