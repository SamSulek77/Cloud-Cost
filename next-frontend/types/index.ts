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
