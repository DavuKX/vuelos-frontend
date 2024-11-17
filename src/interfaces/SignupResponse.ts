import { z } from 'zod';
import { SignupFormSchema } from '@/lib/definitions';

export type SignupFormData = z.infer<typeof SignupFormSchema>;

export interface SignupSuccessResponse {
    success: true;
    data: {
        message: string;
        userId: string;
    };
}

export interface SignupErrorResponse {
    success: false;
    errors: Record<string, string[]>;
}

export type SignupResponse = SignupSuccessResponse | SignupErrorResponse;
