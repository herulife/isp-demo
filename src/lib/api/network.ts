import { fetchApi } from "../api";

export interface RouterStatus {
    ip_address: string;
    status: string; // "ONLINE" | "OFFLINE" | "UNCONFIGURED"
    uptime?: string;
    board_name?: string;
    version?: string;
}

export interface PPPoESession {
    id: string;
    name: string;
    service: string;
    caller_id: string;
    address: string;
    uptime: string;
}

export const networkApi = {
    getRouterStatus: async () => {
        return fetchApi<RouterStatus>("/admin/network/routers");
    },
    getActiveSessions: async () => {
        return fetchApi<PPPoESession[]>("/admin/network/sessions");
    },
};
