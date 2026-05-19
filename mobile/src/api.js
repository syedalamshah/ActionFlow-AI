import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.message ||
      'An unexpected network error occurred.';
    return Promise.reject(new Error(message));
  },
);

export const extractContent = async (text) => {
  const response = await apiClient.post('/extract', { content: text });
  return response.data;
};

export const generateInsights = async (extractionResult) => {
  const response = await apiClient.post('/insights', extractionResult);
  return response.data;
};

export const analyzeImpact = async (insightsResult) => {
  const response = await apiClient.post('/impact', insightsResult);
  return response.data;
};

export const generateActions = async (analyzerResult) => {
  const response = await apiClient.post('/actions', analyzerResult);
  return response.data;
};
