// src/dashboard_app/src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">ChurnBuster Dashboard</h1>
        <nav>
          <Link to="/" className="px-3 hover:text-gray-300">Overview</Link>
          <Link to="/metrics" className="px-3 hover:text-gray-300">Metrics</Link>
          <Link to="/playbooks" className="px-3 hover:text-gray-300">Playbooks</Link>
          <Link to="/alerts" className="px-3 hover:text-gray-300">Alerts</Link>
          <Link to="/settings" className="px-3 hover:text-gray-300">Settings</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
