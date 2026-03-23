import { fetchApi } from '../api';

export interface Customer {
    id: string;
    name: string;
    phone: string;
    address: string;
    coordinate: string;
}

export interface CreateCustomerRequest {
    name: string;
    phone: string;
    password?: string;
    address?: string;
    coordinate?: string;
}

export const getCustomers = async (): Promise<Customer[]> => {
    return fetchApi<Customer[]>('/admin/customers');
};

export const createCustomer = async (data: CreateCustomerRequest): Promise<Customer> => {
    return fetchApi<Customer>('/admin/customers', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const updateCustomer = async (id: string, data: CreateCustomerRequest): Promise<Customer> => {
    return fetchApi<Customer>(`/admin/customers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export const deleteCustomer = async (id: string): Promise<void> => {
    return fetchApi<void>(`/admin/customers/${id}`, {
        method: 'DELETE',
    });
};
