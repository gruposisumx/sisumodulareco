import React, { useState } from 'react';
import { Database, Play, Pause, Settings as SettingsIcon } from 'lucide-react';

interface DatabaseConfig {
  type: 'mysql' | 'postgresql' | 'mongodb' | 'redis';
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
}

interface DatabaseService {
  id: string;
  name: string;
  type: 'mysql' | 'postgresql' | 'mongodb' | 'redis';
  status: 'active' | 'inactive' | 'configuring';
  config: DatabaseConfig | null;
}

const initialDatabases: DatabaseService[] = [
  {
    id: '1',
    name: 'MySQL Primary',
    type: 'mysql',
    status: 'inactive',
    config: null
  },
  {
    id: '2',
    name: 'MongoDB Analytics',
    type: 'mongodb',
    status: 'inactive',
    config: null
  },
  {
    id: '3',
    name: 'Redis Cache',
    type: 'redis',
    status: 'inactive',
    config: null
  }
];

export function DatabaseIntegration() {
  const [databases, setDatabases] = useState<DatabaseService[]>(initialDatabases);
  const [configuring, setConfiguring] = useState<string | null>(null);
  const [config, setConfig] = useState<DatabaseConfig>({
    type: 'mysql',
    host: '',
    port: '',
    username: '',
    password: '',
    database: ''
  });

  const handleToggleStatus = (id: string) => {
    setDatabases(current =>
      current.map(db =>
        db.id === id
          ? { ...db, status: db.status === 'active' ? 'inactive' : 'active' }
          : db
      )
    );
  };

  const handleSaveConfig = (id: string) => {
    setDatabases(current =>
      current.map(db =>
        db.id === id
          ? { ...db, config, status: 'active' }
          : db
      )
    );
    setConfiguring(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Database Services</h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Database className="w-4 h-4 mr-2" />
          Add Database
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {databases.map((db) => (
            <li key={db.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Database className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{db.name}</h3>
                    <p className="text-sm text-gray-500">Type: {db.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    db.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {db.status}
                  </span>
                  <button
                    onClick={() => setConfiguring(db.id)}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <SettingsIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(db.id)}
                    className={`p-2 ${
                      db.status === 'active'
                        ? 'text-red-400 hover:text-red-500'
                        : 'text-green-400 hover:text-green-500'
                    }`}
                  >
                    {db.status === 'active' ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {configuring === db.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Database Configuration</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Host</label>
                      <input
                        type="text"
                        value={config.host}
                        onChange={(e) => setConfig({ ...config, host: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Port</label>
                      <input
                        type="text"
                        value={config.port}
                        onChange={(e) => setConfig({ ...config, port: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Username</label>
                      <input
                        type="text"
                        value={config.username}
                        onChange={(e) => setConfig({ ...config, username: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <input
                        type="password"
                        value={config.password}
                        onChange={(e) => setConfig({ ...config, password: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Database Name</label>
                      <input
                        type="text"
                        value={config.database}
                        onChange={(e) => setConfig({ ...config, database: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      onClick={() => setConfiguring(null)}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveConfig(db.id)}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Save Configuration
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}