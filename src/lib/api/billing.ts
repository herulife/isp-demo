import { fetchApi } from "../api";

export interface Subscription {
    id: string;
    customer_id: string;
    plan_id: string;
    pppoe_username: string;
    billing_cycle_date: number;
    status: "ACTIVE" | "THROTTLED" | "ISOLATED";
    created_at: string;
    updated_at: string;
}

export interface CreateSubscriptionPayload {
    customer_id: string;
    plan_id: string;
    pppoe_username: string;
    pppoe_password?: string;
    billing_cycle_date: number;
}

export interface Invoice {
    id: string;
    invoice_number: string;
    subscription_id: string;
    base_amount: number;
    admin_fee: number;
    total_amount: number;
    due_date: string;
    status: "UNPAID" | "PAID" | "OVERDUE";
    created_at: string;
    updated_at: string;
}

export interface PayInvoicePayload {
    payment_method: string;
    gross_amount: number;
    reference_id?: string;
}

export const billingApi = {
    // Subscriptions
    getSubscriptions: async () => {
        return fetchApi<Subscription[]>("/admin/subscriptions");
    },

    createSubscription: async (data: CreateSubscriptionPayload) => {
        return fetchApi<Subscription>("/admin/subscriptions", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    updateSubscriptionStatus: async (id: string, status: string) => {
        return fetchApi<{ message: string }>(`/admin/subscriptions/${id}/status`, {
            method: "PUT",
            body: JSON.stringify({ status }),
        });
    },

    // Invoices
    getInvoices: async () => {
        return fetchApi<Invoice[]>("/admin/invoices");
    },

    createManualInvoice: async (subscription_id: string) => {
        return fetchApi<Invoice>("/admin/invoices", {
            method: "POST",
            body: JSON.stringify({ subscription_id }),
        });
    },

    payInvoice: async (id: string, data: PayInvoicePayload) => {
        return fetchApi<{ message: string }>(`/admin/invoices/${id}/pay`, {
            method: "POST",
            body: JSON.stringify(data),
        });
    },
};
