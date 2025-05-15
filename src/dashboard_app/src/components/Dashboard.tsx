// DEPRECATED: This file is replaced by Overview.tsx. Kept for reference only.

// The Dashboard component has been superseded by the Overview component as part of the new navigation structure.

// src/dashboard_app/src/components/Dashboard.tsx
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      {/* Placeholder for dashboard widgets and content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Churn Risk</h3>
          <p className="text-3xl font-bold text-red-500">High</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">CLV</h3>
          <p className="text-3xl font-bold text-green-500">$1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Active Playbooks</h3>
          <p className="text-3xl font-bold text-blue-500">5</p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
