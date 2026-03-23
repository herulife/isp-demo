import { fetchApi } from "../api";

export interface DashboardStats {
  total_customers: number;
  active_subscriptions: number;
  isolated_subscriptions: number;
  revenue_this_month: number;
  pending_invoices: number;
}

export const analyticsApi = {
  getStats: async () => {
    return fetchApi<DashboardStats>("/admin/dashboard/stats");
  },
};
