import { User } from "@/interfaces/User";
import { clearCookies, setCookie } from "@/lib/cookieUtils";
import {
    FormState,
    LoginFormSchema,
    LoginFormState,
    SignupFormSchema,
} from "@/lib/definitions";
import axiosInstance from "@/services/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export async function signup(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirm_password"),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const response = await axiosInstance.post("auth/signup", {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
        });

        return {
            success: true,
            data: response.data,
        };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data.message);
            return {
                success: false,
                errors: error.response?.data.message,
            };
        }

        return {
            success: false,
            errors: "An error occurred",
        };
    }
}

export async function login(state: LoginFormState, formData: FormData) {
    const validatedFields = LoginFormSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const response = await axiosInstance.post("auth/login", {
            username: formData.get("username"),
            password: formData.get("password"),
        });

        const { token, username, roles } = response.data;
        setCookie("authToken", token);
        setCookie("authUsername", username);
        setCookie("authRoles", JSON.stringify(roles));

        return {
            success: true,
            data: response.data,
        };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data.message);
            return {
                success: false,
                errors: error.response?.data.message,
            };
        }

        return {
            success: false,
            errors: "An error occurred. Please try again.",
        };
    }
}

export function signOut() {
    clearCookies();

    redirect("/auth/login");
}

export async function getAuthUser() {
    try {
        const response: AxiosResponse = await axiosInstance.get("auth/me");
        const data = response.data as User;
        return data;

    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data.message);
            signOut();
        }

        return null;
    } 
}
