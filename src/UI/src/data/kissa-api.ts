import { apiClient } from "./api-client";
import { z } from "zod";

const profileScheme = z.object({
    id: z.string(),
    name: z.string()
});

export async function registerUser() {
    await apiClient.post("/wtf");
}

export async function hoi() {
    await apiClient.get("/hoi");
}
