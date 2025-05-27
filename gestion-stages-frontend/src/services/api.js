import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true // Important for cookies/CSRF to work properly
});

// Fetch all active entreprises for stage assignments
export const fetchEntreprises = () => api.get('/etudiant/entreprises');

// Fetch all active formateurs for stage assignments
export const fetchFormateurs = () => api.get('/etudiant/formateurs');

// Submit a new stage (for authenticated stagiaire)
export const submitStage = (formData) => api.post('/etudiant/stages', formData);

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // For file uploads, don't manually set Content-Type
    if (config.data instanceof FormData) {
      // Let axios set the Content-Type header with the correct boundary
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to get CSRF cookie before making authenticated requests
const getCsrfCookie = async () => {
  try {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true
    });
  } catch (error) {
    console.error('Error getting CSRF cookie:', error);
  }
};

// Authentication services
export const authService = {
  // Login for administrators
  loginAdministrateur: async (email, password) => {
    try {
      // Get CSRF cookie first
      await getCsrfCookie();
      
      const response = await api.post('/login/administrateur', { email, password });
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userType', 'administrateur');
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Login for students
  loginStagiaire: async (email, password) => {
    try {
      // Get CSRF cookie first
      await getCsrfCookie();
      
      const response = await api.post('/login/stagiaire', { email, password });
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userType', 'stagiaire');
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Login for instructors
  loginFormateur: async (email, password) => {
    try {
      // Get CSRF cookie first
      await getCsrfCookie();
      
      const response = await api.post('/login/formateur', { email, password });
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userType', 'formateur');
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get user type
  getUserType: () => {
    return localStorage.getItem('userType');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default api;
