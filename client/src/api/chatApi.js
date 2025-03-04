import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const handleApiError = (error) => {
    if (error.response) {
        // Server responded with an error
        throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
        // Request was made but no response
        throw new Error('No response from server');
    } else {
        // Error in request setup
        throw new Error('Error setting up request');
    }
};

export const chatApi = {
    sendMessage: async (message) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/chat/messages/send_message/`, {
                message
            });
            
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    getConversationHistory: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/chat/messages/get_history/`);
            return response.data.map(msg => {
                // Parse the JSON-encoded bot response
                let botResponse;
                try {
                    botResponse = JSON.parse(msg.bot_response);
                } catch (e) {
                    console.error('Error parsing bot response:', e);
                    botResponse = { summary: msg.bot_response };
                }
                
                return {
                    id: msg.id.toString(),
                    content: botResponse.summary || botResponse.message || msg.bot_response,
                    sender: 'ai',
                    timestamp: msg.timestamp,
                    userMessage: msg.user_message,
                    structuredData: botResponse
                };
            });
        } catch (error) {
            handleApiError(error);
        }
    }
};
