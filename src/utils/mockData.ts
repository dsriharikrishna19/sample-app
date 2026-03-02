import { User } from '../types/user';

export const MOCK_USERS: User[] = [
    {
        id: '1',
        name: 'Sarah',
        age: 24,
        bio: 'Travel enthusiast and coffee lover. Looking for someone to explore the city with!',
        images: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800'],
        interests: ['Travel', 'Coffee', 'Music'],
        gender: 'female',
    },
    {
        id: '2',
        name: 'Jessica',
        age: 27,
        bio: 'Foodie, hiker, and amateur photographer. Let’s grab a taco!',
        images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800'],
        interests: ['Hiking', 'Food', 'Photography'],
        gender: 'female',
    },
    {
        id: '3',
        name: 'Emily',
        age: 22,
        bio: 'Art student who loves museums and indie movies.',
        images: ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800'],
        interests: ['Art', 'Movies', 'Design'],
        gender: 'female',
    },
];
