import { fetchApi } from "../api";

export const settingsApi = {
    getSettings: async () => {
        return fetchApi<Record<string, string>>("/admin/settings");
    },
    updateSettings: async (settings: Record<string, string>) => {
        return fetchApi<{ message: string }>("/admin/settings", {
            method: "PUT",
            body: JSON.stringify(settings),
        });
    },
};
