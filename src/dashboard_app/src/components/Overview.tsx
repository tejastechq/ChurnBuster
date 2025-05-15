import React from 'react';
import { useData } from '../contexts/DataContext';

const Overview: React.FC = () => {
  const { overviewData, loading, error, refreshOverview } = useData();

  return (
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium">Churn Risk</h3>
          <div className="h-16 flex items-center justify-center">
            {loading ? (
              <span>Loading...</span>
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : overviewData ? (
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">{overviewData.highRisk + overviewData.mediumRisk + overviewData.lowRisk}</div>
                <div className="text-sm text-gray-600">High: {overviewData.highRisk}, Med: {overviewData.mediumRisk}, Low: {overviewData.lowRisk}</div>
              </div>
            ) : (
              <span className="text-gray-400">[No Data]</span>
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">CLV</h3>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error</p>
          ) : overviewData ? (
            <p className="text-3xl font-bold text-green-500">${overviewData.averageCLV.toFixed(2)}</p>
          ) : (
            <p className="text-gray-400">[No Data]</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Retention</h3>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error</p>
          ) : overviewData ? (
            <p className="text-3xl font-bold text-blue-500">{(overviewData.retentionRate * 100).toFixed(1)}%</p>
          ) : (
            <p className="text-gray-400">[No Data]</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Active Playbooks</h3>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error</p>
          ) : overviewData ? (
            <p className="text-3xl font-bold text-purple-500">{overviewData.activePlaybooksCount}</p>
          ) : (
            <p className="text-gray-400">[No Data]</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Recent Alerts</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Alert 1: Customer at risk</li>
            <li>Alert 2: Playbook executed</li>
            <li>Alert 3: New churn prediction</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Quick Actions</h4>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded mb-2">Add Playbook</button>
          <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded">View Details</button>
          <button onClick={refreshOverview} className="w-full bg-green-600 text-white py-2 px-4 rounded mt-2">Refresh Data</button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
          <h4 className="font-semibold mb-2">Summary Graph</h4>
          <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">[Graph Placeholder]</div>
        </div>
      </div>
    </main>
  );
};

export default Overview; 