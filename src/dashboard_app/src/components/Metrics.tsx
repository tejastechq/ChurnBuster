import React, { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext';

const Metrics: React.FC = () => {
  const { metricsData, loading, error, fetchMetrics } = useData();
  const [customerId, setCustomerId] = useState<string>('default');
  const [dateRange, setDateRange] = useState<number>(30);

  useEffect(() => {
    fetchMetrics(customerId, dateRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId, dateRange]);

  const handleDateRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const range = parseInt(event.target.value);
    setDateRange(range);
  };

  const handleCustomerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCustomerId(event.target.value);
  };

  return (
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Metrics</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Date Range</label>
          <select 
            className="w-full p-2 border rounded" 
            onChange={handleDateRangeChange}
            value={dateRange}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Customer/Segment</label>
          <select 
            className="w-full p-2 border rounded"
            onChange={handleCustomerChange}
            value={customerId}
          >
            <option value="default">All Customers</option>
            <option value="ent1">Enterprise Customer #1</option>
            <option value="smb1">SMB Customer #1</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <h3 className="font-semibold mb-2">Churn Risk</h3>
          <div className="w-full h-40 bg-gray-100 rounded flex items-center justify-center text-gray-700">
            {loading ? (
              <span>Loading...</span>
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : metricsData && metricsData.dataPoints.length > 0 ? (
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {(metricsData.dataPoints[metricsData.dataPoints.length - 1].churnProbability * 100).toFixed(1)}%
                </div>
                <div className={
                  metricsData.dataPoints[metricsData.dataPoints.length - 1].churnProbability > 0.5 
                    ? 'text-red-500 font-semibold' 
                    : 'text-green-600 font-semibold'
                }>
                  {metricsData.dataPoints[metricsData.dataPoints.length - 1].churnProbability > 0.5 ? 'High Risk' : 'Low Risk'}
                </div>
              </div>
            ) : (
              <span className="text-gray-400">[No Data]</span>
            )}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <h3 className="font-semibold mb-2">Usage Score Trend</h3>
          <div className="w-full h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">
            {loading ? (
              <span>Loading...</span>
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : metricsData && metricsData.dataPoints.length > 0 ? (
              <span>[Usage Score Trend Graph]</span>
            ) : (
              <span>[No Data]</span>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
        <h3 className="font-semibold mb-2">Support Tickets Table/Chart</h3>
        <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
          {loading ? (
            <span>Loading...</span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : metricsData && metricsData.dataPoints.length > 0 ? (
            <span>[Support Tickets Table/Chart]</span>
          ) : (
            <span>[No Data]</span>
          )}
        </div>
      </div>
    </main>
  );
};

export default Metrics; 