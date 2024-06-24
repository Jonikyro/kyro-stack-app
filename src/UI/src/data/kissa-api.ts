// import { z } from 'zod';
import { apiClient } from './api-client';

// const profileScheme = z.object({
//     id: z.string(),
//     name: z.string()
// });

// type Profile = z.infer<typeof profileScheme>;

export async function registerUser() {
   await apiClient.post('/wtf');
}

export async function hoi() {
   await apiClient.get('/hoi');
}
