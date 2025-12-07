const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/sales';

export const fetchSales = async (params) => {
    try {
        const query = new URLSearchParams(params).toString();
        const response = await fetch(`${API_URL}?${query}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const fetchFilters = async () => {
    try {
        const response = await fetch(`${API_URL}/filters`);
        if (!response.ok) throw new Error('Failed to fetch filters');
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
