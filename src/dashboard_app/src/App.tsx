import React from 'react';
import './App.css';
import Header from './components/Header';
import Overview from './components/Overview';
import Metrics from './components/Metrics';
import Playbooks from './components/Playbooks';
import Alerts from './components/Alerts';
import Settings from './components/Settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Footer from './components/Footer';

const Placeholder: React.FC<{ name: string }> = ({ name }) => (
  <main className="container mx-auto p-4">
    <h2 className="text-2xl font-semibold mb-4">{name}</h2>
    <div className="bg-white p-6 rounded-lg shadow text-gray-400">[Static UI for {name} will be implemented here]</div>
  </main>
);

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {isAuthenticated ? (
        <>
          <Header />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/metrics" element={<Metrics />} />
              <Route path="/playbooks" element={<Playbooks />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppContent />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
