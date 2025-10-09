import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

export const API_BASE_URL = import.meta.env.VITE_PUBLIC_BACKEND_URL || "http://localhost:4000";

// Initialize axios interceptors after store creation
let isInterceptorSetup = false;

export const setupInterceptors = () => {
  if (isInterceptorSetup) return;

  axios.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // clear user/session
        useAuthStore.getState().clearAuth();

        // redirect only on client
        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/login"
        ) {
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );

  isInterceptorSetup = true;
};


export const websiteService = {
  createWebsite: async (websiteData: any) => {
    setupInterceptors();
    const response = await axios.post(`${API_BASE_URL}/api/websites`, websiteData);
    return response.data.data;
  },

  getWebsites: async () => {
    setupInterceptors();
    const response = await axios.get(`${API_BASE_URL}/api/websites`);
    return response.data.data;
  }
};

// Accessibility Service
export const accessibilityService = {
  saveAccessibilityResults: async (websiteId: string | number, accessibilityData: any) => {
    setupInterceptors();
    const response = await axios.post(`${API_BASE_URL}/api/websites/${websiteId}/accessibility`, accessibilityData);
    return response.data.data;
  },

  getAccessibilityResults: async (websiteId: string | number) => {
    setupInterceptors();
    const response = await axios.get(`${API_BASE_URL}/api/websites/${websiteId}/accessibility`);
    return response.data.data;
  },

  generateAccessibilityRecommendations: async (websiteId: string | number, recommendationData: any) => {
    setupInterceptors();
    const response = await axios.post(`${API_BASE_URL}/api/websites/${websiteId}/recommendations`, recommendationData);
    return response.data.data;
  }
};

// Snapshot Service
export const snapshotService = {
  createSnapshot: async (websiteId: string | number, snapshotData: any) => {
    setupInterceptors();
    const response = await axios.post(`${API_BASE_URL}/api/websites/${websiteId}/snapshots`, snapshotData);
    return response.data.data;
  },

  getSnapshots: async (websiteId: string | number) => {
    setupInterceptors();
    const response = await axios.get(`${API_BASE_URL}/api/websites/${websiteId}/snapshots`);
    return response.data.data;
  },
};

// Chat Service
export const chatService = {
  processChat: async (chatData: any) => {
    setupInterceptors();
    const response = await axios.post(`${API_BASE_URL}/api/chat`, chatData);
    return response.data.data;
  }
};

// Member Service
export const memberService = {
  getMembersByUser: async () => {
    setupInterceptors();
    const response = await axios.get(`${API_BASE_URL}/api/members`);
    return response.data.data;
  },

  createMember: async (memberData: any) => {
    setupInterceptors();
    const response = await axios.post(`${API_BASE_URL}/api/members`, memberData);
    return response.data.data;
  },

  updateMember: async (memberId: string | number, memberData: any) => {
    setupInterceptors();
    const response = await axios.put(`${API_BASE_URL}/api/members/${memberId}`, memberData);
    return response.data.data;
  },

  deleteMember: async (memberId: string | number) => {
    setupInterceptors();
    const response = await axios.delete(`${API_BASE_URL}/api/members/${memberId}`);
    return response.data.data;
  }
};

// Report Service
export const reportService = {
  generateReportGET: async () => {
    setupInterceptors();
    const response = await axios.get(`${API_BASE_URL}/api/reports/accessibility-pdf`);
    return response.data.data;
  },

  generateReportPOST: async (reportData: any) => {
    setupInterceptors();
    const response = await axios.post(`${API_BASE_URL}/api/reports/accessibility-pdf`, reportData);
    return response.data.data;
  },

  // New: Generate report as PDF Blob
  generateReportPdf: async (manualIssues: any[] = []) => {
    setupInterceptors();
    const response = await axios.post(
      `${API_BASE_URL}/api/reports/accessibility-pdf`,
      { manualIssues },
      { responseType: 'blob' }
    );
    return response.data as Blob;
  }
};

// Utility Service
export const utilityService = {
  analyzeAccessibility: async (analysisData: any) => {
    setupInterceptors();
    const response = await axios.post(`${API_BASE_URL}/api/analyze-accessibility`, analysisData);
    return response.data.data;
  },

  // NEW: Generate code fixes for accessibility issues
  generateCodeFixes: async (issues: any[]) => {
    setupInterceptors();
    const response = await axios.post(`${API_BASE_URL}/api/accessibility/generate-fixes`, { issues });
    return response.data.data;
  }
};

// Health Check
export const healthService = {
  checkHealth: async () => {
    setupInterceptors();
    const response = await axios.get(`${API_BASE_URL}/api/health`);
    return response.data.data;
  }
};