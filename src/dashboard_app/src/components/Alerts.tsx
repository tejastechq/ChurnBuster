import React, { useContext, useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext';

const Alerts = () => {
  const { alerts, fetchAlerts } = useData();
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTakeAction = async (alertId: string) => {
    try {
      // For now, we'll simulate dismissing the alert. In a real app, this would call an API to take action.
      // await api.takeAlertAction(alertId, { action: 'dismiss' });
      setActionError(null);
      // Refresh alerts after action
      fetchAlerts();
    } catch (error) {
      setActionError('Failed to take action on alert. Please try again.');
      console.error('Error taking action on alert:', error);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Alerts</h1>
      {actionError && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          <span className="block sm:inline">{actionError}</span>
          <button onClick={() => setActionError(null)} className="ml-2 text-red-700 font-bold">X</button>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Churn Risk Notifications</h2>
        {alerts && alerts.length > 0 ? (
          <ul className="space-y-4">
            {alerts.map((alert) => (
              <li key={alert.id} className={`p-4 rounded-lg ${alert.severity === 'high' ? 'bg-red-100' : alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-green-100'}`}> 
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-gray-600">{alert.date}</p>
                  </div>
                  <button onClick={() => handleTakeAction(alert.id)} className="text-sm text-blue-600 hover:text-blue-800">Take Action</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No alerts at this time.</p>
        )}
      </div>
    </div>
  );
};

export default Alerts; 