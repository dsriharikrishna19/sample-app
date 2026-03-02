import { z } from 'zod';

export const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    age: z.number().min(18, 'You must be at least 18 years old'),
    bio: z.string().max(500, 'Bio must be under 500 characters'),
    gender: z.enum(['male', 'female', 'other']),
    interests: z.array(z.string()).min(1, 'Select at least one interest'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
