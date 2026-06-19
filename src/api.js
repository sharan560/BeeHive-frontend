import axios from 'axios'

// Use localhost for development, production URL for production
const API_BASE_URL = import.meta.env.MODE === 'development' 
  ? 'http://localhost:5000' 
  : 'https://smartbee-backend.onrender..com'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  signup: (data) => api.post('/api/auth/signup', data),
  login: (data) => api.post('/api/auth/login', data),
}

export const ledAPI = {
  setLed: (data) => api.post('/api/led', data),
  getLed: (farmId) => api.get(`/api/led/${farmId}`),
}

export const apiKeyAPI = {
  saveKey: (data) => api.post('/api/saveKey', data),
}

export default api
