import { z } from 'zod';

export const loginSchema = z.object({
    mobile: z.string().regex(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number'),
});

export const registerSchema = z.object({
    mobile: z.string().regex(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
