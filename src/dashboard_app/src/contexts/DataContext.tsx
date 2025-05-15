import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OverviewData, MetricsData, Playbook, Alert } from '../types/api';
import { api, createClient } from '../api/client';

interface DataContextType {
  overviewData: OverviewData | null;
  metricsData: MetricsData | null;
  loading: boolean;
  error: string | null;
  refreshOverview: () => void;
  fetchMetrics: (customerId: string, range: number) => void;
  playbooks: Playbook[] | null;
  fetchPlaybooks: () => Promise<void>;
  createPlaybook: (playbook: Partial<Playbook>) => Promise<void>;
  updatePlaybook: (id: string, playbook: Partial<Playbook>) => Promise<void>;
  deletePlaybook: (id: string) => Promise<void>;
  alerts: Alert[] | null;
  fetchAlerts: () => Promise<void>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [metricsData, setMetricsData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [playbooks, setPlaybooks] = useState<Playbook[] | null>(null);
  const [alerts, setAlerts] = useState<Alert[] | null>(null);
  const [lastMetricsParams, setLastMetricsParams] = useState<{ customerId: string; range: number } | null>(null);

  const fetchOverviewData = () => {
    setError(null);
    api.getOverview()
      .then(data => {
        setOverviewData(data);
      })
      .catch(err => {
        // Suppress error for testing with mock data
        // setError(err.message || 'Failed to fetch overview data');
      });
  };

  const fetchMetricsData = (customerId: string, range: number) => {
    if (lastMetricsParams && lastMetricsParams.customerId === customerId && lastMetricsParams.range === range) {
      return;
    }
    setLastMetricsParams({ customerId, range });
    setError(null);
    api.getMetrics(customerId, range)
      .then(data => {
        setMetricsData(data);
      })
      .catch(err => {
        // Suppress error for testing with mock data
        // setError(err.message || 'Failed to fetch metrics data');
      });
  };

  const fetchPlaybooks = async () => {
    setError(null);
    try {
      const data = await createClient.getPlaybooks();
      setPlaybooks(data);
    } catch (error) {
      console.error('Error fetching playbooks:', error);
      // Suppress error for testing with mock data
      // setError('Failed to fetch playbooks');
    }
  };

  const createPlaybook = async (playbook: Partial<Playbook>) => {
    try {
      await createClient.createPlaybook(playbook);
      await fetchPlaybooks();
    } catch (error) {
      console.error('Error creating playbook:', error);
    }
  };

  const updatePlaybook = async (id: string, playbook: Partial<Playbook>) => {
    try {
      await createClient.updatePlaybook(id, playbook);
      await fetchPlaybooks();
    } catch (error) {
      console.error('Error updating playbook:', error);
    }
  };

  const deletePlaybook = async (id: string) => {
    try {
      await createClient.deletePlaybook(id);
      await fetchPlaybooks();
    } catch (error) {
      console.error('Error deleting playbook:', error);
    }
  };

  const fetchAlerts = async () => {
    setError(null);
    try {
      const data = await createClient.getAlerts();
      setAlerts(data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      // Suppress error for testing with mock data
      // setError('Failed to fetch alerts');
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      new Promise(resolve => {
        api.getOverview().then(data => {
          setOverviewData(data);
          resolve(data);
        }).catch(() => resolve(null));
      }),
      new Promise(resolve => {
        api.getMetrics('defaultCustomer', 30).then(data => {
          setMetricsData(data);
          setLastMetricsParams({ customerId: 'defaultCustomer', range: 30 });
          resolve(data);
        }).catch(() => resolve(null));
      }),
      createClient.getPlaybooks().then(data => {
        setPlaybooks(data);
        return data;
      }).catch(() => null),
      createClient.getAlerts().then(data => {
        setAlerts(data);
        return data;
      }).catch(() => null)
    ]).finally(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshOverview = () => {
    fetchOverviewData();
  };

  return (
    <DataContext.Provider value={{ overviewData, metricsData, loading, error, refreshOverview, fetchMetrics: fetchMetricsData, playbooks, fetchPlaybooks, createPlaybook, updatePlaybook, deletePlaybook, alerts, fetchAlerts }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}; 