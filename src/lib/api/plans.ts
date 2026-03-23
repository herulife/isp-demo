import { fetchApi } from '../api';

export interface Plan {
    id: string;
    name: string;
    price: number;
    speed_limit: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreatePlanRequest {
    name: string;
    price: number;
    speed_limit: string;
    is_active: boolean;
}

export const getPlans = async (): Promise<Plan[]> => {
    return fetchApi<Plan[]>('/admin/plans');
};

export const createPlan = async (data: CreatePlanRequest): Promise<Plan> => {
    return fetchApi<Plan>('/admin/plans', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const updatePlan = async (id: string, data: CreatePlanRequest): Promise<Plan> => {
    return fetchApi<Plan>(`/admin/plans/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export const deletePlan = async (id: string): Promise<void> => {
    return fetchApi<void>(`/admin/plans/${id}`, {
        method: 'DELETE',
    });
};
