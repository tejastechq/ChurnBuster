import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="font-semibold mb-3">User Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Theme</label>
            <select className="w-full p-2 border rounded">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Notification Frequency</label>
            <select className="w-full p-2 border rounded">
              <option>Immediate</option>
              <option>Daily Digest</option>
              <option>Weekly Digest</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Notifications</label>
            <div className="flex items-center">
              <input type="checkbox" id="email-notifs" className="mr-2" />
              <label htmlFor="email-notifs">Enable email notifications for high-risk alerts</label>
            </div>
          </div>
        </div>
        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">Save Preferences</button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-3">Account Management</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input type="password" className="w-full p-2 border rounded" placeholder="Enter current password" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input type="password" className="w-full p-2 border rounded" placeholder="Enter new password" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input type="password" className="w-full p-2 border rounded" placeholder="Confirm new password" />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="bg-blue-600 text-white py-2 px-4 rounded">Update Password</button>
          <button className="bg-red-600 text-white py-2 px-4 rounded">Delete Account</button>
        </div>
      </div>
    </main>
  );
};

export default Settings; 