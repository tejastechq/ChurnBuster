export interface OverviewData {
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  averageCLV: number;
  retentionRate: number;
  activePlaybooksCount: number;
}

export interface MetricsDataPoint {
  date: string;
  usageScore: number;
  supportTickets: number;
  churnProbability: number;
}

export interface MetricsData {
  customerId: string;
  dataPoints: MetricsDataPoint[];
}

export interface Playbook {
  id: string;
  name: string;
  description: string;
  rules: Array<{ condition: string; action: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface Alert {
  id: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  date: string;
  customerId?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PlaybookCreateRequest {
  name: string;
  triggers: string[];
  actions: string[];
}

export interface AlertActionRequest {
  action: 'dismiss' | 'triggerPlaybook';
  playbookId?: string;
} 