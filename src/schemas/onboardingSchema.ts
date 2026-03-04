import { z } from "zod";

export const onboardingSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    age: z.number().min(18, "You must be at least 18 years old").max(60, "Age must be below 60"),
    gender: z.enum(["male", "female", "other", "prefer_not_to_say"]),
    height: z.number().min(100, "Height must be at least 100cm").max(250, "Height must be below 250cm"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    country: z.string().min(2, "Country is required"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),

    // ✅ NEW FIELDS
    bio: z.string().min(20, "Bio must be at least 20 characters").max(300, "Bio must be below 300 characters"),

    zodiacSign: z.enum([
        "Aries",
        "Taurus",
        "Gemini",
        "Cancer",
        "Leo",
        "Virgo",
        "Libra",
        "Scorpio",
        "Sagittarius",
        "Capricorn",
        "Aquarius",
        "Pisces"
    ]),

    relationshipType: z.enum([
        "Serious",
        "Casual",
        "Marriage",
        "Friendship"
    ]),

    datingIntent: z.enum([
        "Long-term",
        "Short-term"
    ]),

    interests: z.array(z.string()).min(1, "Select at least one interest"),
    images: z.array(z.string())
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
