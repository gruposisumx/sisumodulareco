import React, { useState } from 'react';
import { User, Shield, Key, Bell, Clock } from 'lucide-react';
import type { UserProfile, SecuritySettings, NotificationPreference } from '../../types';

const initialProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  department: 'Management',
  phoneNumber: '+1 (555) 123-4567',
  timezone: 'America/New_York',
  language: 'en',
  twoFactorEnabled: true
};

const initialSecuritySettings: SecuritySettings = {
  passwordLastChanged: new Date().toISOString(),
  loginHistory: [
    {
      id: '1',
      timestamp: new Date().toISOString(),
      device: 'Chrome on Windows',
      location: 'New York, USA',
      ip: '192.168.1.1'
    }
  ],
  securityQuestions: [
    { question: "What was your first pet's name?", answered: true },
    { question: "In what city were you born?", answered: true }
  ]
};

const initialNotifications: NotificationPreference[] = [
  { type: 'email', enabled: true, frequency: 'daily' },
  { type: 'push', enabled: true, frequency: 'immediate' },
  { type: 'sms', enabled: false, frequency: 'never' }
];

export function ProfileApp() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [security, setSecurity] = useState(initialSecuritySettings);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');

  const handleProfileUpdate = (updates: Partial<UserProfile>) => {
    setProfile(current => ({ ...current, ...updates }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <User className="w-8 h-8" />
          Profile Management
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <User className="w-5 h-5 mx-auto mb-1" />
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'security'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Shield className="w-5 h-5 mx-auto mb-1" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex-1 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'notifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Bell className="w-5 h-5 mx-auto mb-1" />
              Notifications
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg border border-gray-200">
                    <User className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-medium">{profile.name}</h3>
                  <p className="text-sm text-gray-500">{profile.email}</p>
                  <p className="text-sm text-gray-500">{profile.department}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleProfileUpdate({ name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileUpdate({ email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phoneNumber}
                    onChange={(e) => handleProfileUpdate({ phoneNumber: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    value={profile.department}
                    onChange={(e) => handleProfileUpdate({ department: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Shield className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Password last changed {new Date(security.passwordLastChanged).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center space-x-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.twoFactorEnabled}
                      onChange={(e) => handleProfileUpdate({ twoFactorEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-sm text-gray-500">Enable two-factor authentication</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Recent Login Activity</h3>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <ul className="divide-y divide-gray-200">
                    {security.loginHistory.map((login) => (
                      <li key={login.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-gray-400" />
                            <p className="ml-2 text-sm font-medium text-gray-900">{login.device}</p>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {login.location}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="text-sm text-gray-500">
                              IP: {login.ip}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              {new Date(login.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              {notifications.map((notification) => (
                <div key={notification.type} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium capitalize">{notification.type} Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Receive notifications via {notification.type}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={notification.frequency}
                      onChange={(e) => {
                        setNotifications(current =>
                          current.map(n =>
                            n.type === notification.type
                              ? { ...n, frequency: e.target.value as any }
                              : n
                          )
                        );
                      }}
                      className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="immediate">Immediate</option>
                      <option value="daily">Daily Digest</option>
                      <option value="weekly">Weekly Digest</option>
                      <option value="never">Never</option>
                    </select>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notification.enabled}
                        onChange={(e) => {
                          setNotifications(current =>
                            current.map(n =>
                              n.type === notification.type
                                ? { ...n, enabled: e.target.checked }
                                : n
                            )
                          );
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}