import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Types
export interface ChatResponse {
    summary: string;
    key_insights: string[];
    data: Record<string, any>;
    message?: string;
    status?: 'success' | 'error';
    error?: string;
}

export interface ChatError {
    message: string;
    status?: number;
}

// Error handling
const handleApiError = (error: AxiosError): never => {
    const chatError: ChatError = {
        message: 'An unexpected error occurred',
        status: error.response?.status
    };

    if (error.response) {
        // Server responded with an error
        // chatError.message = error.response.data.message || 'Server error';
    } else if (error.request) {
        // Request was made but no response
        chatError.message = 'No response from server';
    } else {
        // Error in request setup
        chatError.message = 'Error setting up request';
    }

    throw chatError;
};

// API client
export const chatApi = {
    sendMessage: async (message: string): Promise<ChatResponse> => {
        try {
            const response = await axios.post<ChatResponse>(
                `${API_BASE_URL}/chat/messages/send_message/`, 
                { message },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw handleApiError(error);
            }
            throw error;
        }
    }
};
