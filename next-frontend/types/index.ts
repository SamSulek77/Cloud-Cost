export interface ChartPoint {
    month: string;
    total_cost: number;
}

export interface AccountBreakdownPoint {
    month: string;
    [key: string]: string | number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'devops' | 'hod' | 'finance' | 'super_admin' | 'admin' | 'viewer' | string;
}

export interface ServiceRow {
    month_year: string;
    account_name: string;
    product_code: string;
    product_name: string;
    total_cost: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
    // Specific fields for certain endpoints
    accounts?: string[];
    grouped?: any;
}

export interface SettingsData {
    theme: 'light' | 'dark';
    notifications: boolean;
}

export interface UploadResponse {
    success: boolean;
    message?: string;
    error?: string;
}

export interface ServiceCostItem {
    product_code: string;
    product_name: string;
    month_year: string;
    total_cost: number;
    usage_count: number;
}

export interface ServiceTrendItem {
    month_year: string;
    product_code: string;
    product_name: string;
    total_cost: number;
}
