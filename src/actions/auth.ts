import {SignupFormSchema, FormState} from "@/lib/definitions";
import axiosInstance from "@/services/axiosInstance";
import {AxiosError} from "axios";
import {toast} from "react-toastify";

export async function signup(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirm_password'),
    })

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        const response = await axiosInstance.post('auth/signup', {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
        })

        return {
            success: true,
            data: response.data,
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data.message)
            return {
                success: false,
                errors: error.response?.data.message,
            }
        }

        return {
            success: false,
            errors: 'An error occurred',
        }
    }
}