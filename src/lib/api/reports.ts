import { fetchApi } from "../api";

export interface PaymentReportItem {
    id: string;
    invoice_id: string;
    amount: number;
    method: string;
    paid_at: string;
    customer_name: string;
}

export interface RevenueReport {
    total_revenue: number;
    payments: PaymentReportItem[];
}

export const reportsApi = {
    getRevenueReport: async (startDate?: string, endDate?: string) => {
        const params = new URLSearchParams();
        if (startDate) params.append("start_date", startDate);
        if (endDate) params.append("end_date", endDate);

        const query = params.toString();
        const url = `/admin/reports/revenue${query ? `?${query}` : ""}`;
        return fetchApi<RevenueReport>(url);
    },
};
