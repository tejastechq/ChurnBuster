import { OverviewData, MetricsData, Playbook, Alert, AuthResponse, PlaybookCreateRequest, AlertActionRequest } from '../types/api';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

// Store for auth token
const authStore = {
  token: localStorage.getItem('auth_token') || null,
  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  },
};

// Generic fetch wrapper with auth and error handling
function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (authStore.token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${authStore.token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  return fetch(`${API_BASE_URL}${endpoint}`, config)
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'API request failed');
        });
      }
      return response.json() as Promise<T>;
    })
    .catch(error => {
      throw error instanceof Error ? error : new Error('Network error');
    });
}

// Define User type for login response
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// API Methods
export const api = {
  // Authentication
  login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Simulate successful login for demo purposes if backend is not available
    if (email === 'demo@example.com' && password === 'password') {
      const demoUser = { id: '1', email: 'demo@example.com', name: 'Demo User', role: 'admin' };
      const demoToken = 'demo-token';
      authStore.setToken(demoToken);
      return Promise.resolve({ user: demoUser, token: demoToken });
    }
    return apiFetch<{ user: User; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }).then(response => {
      authStore.setToken(response.token);
      return response;
    });
  },

  logout(): Promise<void> {
    return apiFetch<void>('/auth/logout', {
      method: 'POST',
    }).then(() => {
      authStore.setToken(null);
    });
  },

  // Overview
  getOverview(): Promise<OverviewData> {
    // Return mock data for testing
    return Promise.resolve({
      churnRisk: 0.25,
      customerLifetimeValue: 1200,
      retentionRate: 0.78,
      activeAlerts: 3,
      highRisk: 10,
      mediumRisk: 20,
      lowRisk: 70,
      averageCLV: 1100,
      activePlaybooksCount: 2
    });
  },

  // Metrics
  getMetrics(customerId: string, range: number): Promise<MetricsData> {
    // Return mock data for testing
    return Promise.resolve({
      customerId: customerId,
      range: range,
      churnProbability: 0.3,
      engagementScore: 0.65,
      revenueTrend: [1000, 1100, 900, 1200, 1300],
      supportTickets: 5,
      dataPoints: [
        { date: '2025-05-01', churnProbability: 0.28, engagementScore: 0.6, revenue: 1000, usageScore: 0.7, supportTickets: 2 },
        { date: '2025-05-02', churnProbability: 0.3, engagementScore: 0.65, revenue: 1100, usageScore: 0.72, supportTickets: 1 }
      ]
    });
  },

  // Playbooks
  getPlaybooks(): Promise<Playbook[]> {
    // Return mock data for testing
    return Promise.resolve([
      { id: '1', name: 'Engagement Boost', description: 'Increase customer engagement', rules: [{ condition: 'Low engagement', action: 'Send email' }], createdAt: '2025-05-10', updatedAt: '2025-05-12' },
      { id: '2', name: 'Churn Prevention', description: 'Prevent customer churn', rules: [{ condition: 'High churn risk', action: 'Offer discount' }], createdAt: '2025-05-11', updatedAt: '2025-05-13' }
    ]);
  },

  getPlaybook(id: string): Promise<Playbook> {
    // Return mock data for testing
    return Promise.resolve({ id: id, name: 'Sample Playbook', description: 'Sample description', rules: [{ condition: 'Sample condition', action: 'Sample action' }], createdAt: '2025-05-10', updatedAt: '2025-05-10' });
  },

  createPlaybook(playbook: Partial<Playbook>): Promise<Playbook> {
    // Simulate creation with mock data
    return Promise.resolve({ id: 'new', name: playbook.name || 'New Playbook', description: playbook.description || 'New Description', rules: playbook.rules || [], createdAt: '2025-05-15', updatedAt: '2025-05-15' });
  },

  updatePlaybook(id: string, playbook: Partial<Playbook>): Promise<Playbook> {
    // Simulate update with mock data
    return Promise.resolve({ id: id, name: playbook.name || 'Updated Playbook', description: playbook.description || 'Updated Description', rules: playbook.rules || [], createdAt: '2025-05-10', updatedAt: '2025-05-15' });
  },

  deletePlaybook(id: string): Promise<void> {
    // Simulate deletion
    return Promise.resolve();
  },

  // Alerts
  getAlerts(): Promise<Alert[]> {
    // Return mock data for testing
    return Promise.resolve([
      { id: '1', message: 'High churn risk for Customer A', severity: 'high', date: '2025-05-15' },
      { id: '2', message: 'Low engagement for Customer B', severity: 'medium', date: '2025-05-14' }
    ]);
  },

  takeAlertAction(id: string, data: AlertActionRequest): Promise<void> {
    // Simulate action taken
    return Promise.resolve();
  },

  setToken(token: string | null): void {
    authStore.setToken(token);
  },
};

// Export createClient
export const createClient = {
  getPlaybooks: api.getPlaybooks,
  createPlaybook: api.createPlaybook,
  updatePlaybook: api.updatePlaybook,
  deletePlaybook: api.deletePlaybook,
  getAlerts: api.getAlerts,
};

export default api; 