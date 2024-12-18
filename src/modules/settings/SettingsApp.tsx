import React from 'react';
import { Settings, Bell, Shield, Palette, Database, Users, Globe, Image } from 'lucide-react';
import { SettingsSection } from './components/SettingsSection';
import { SettingsCard } from './components/SettingsCard';
import { LanguageSelector } from './components/LanguageSelector';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { LogoUpload } from './components/LogoUpload';
import { DatabaseIntegration } from './components/DatabaseIntegration';
import type { SettingCategory } from '../../types';

const settingsCategories: SettingCategory[] = [
  {
    id: 'general',
    name: 'General Settings',
    icon: Settings,
    description: 'Basic configuration and preferences'
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: Bell,
    description: 'Manage alerts and notifications'
  },
  {
    id: 'security',
    name: 'Security',
    icon: Shield,
    description: 'Security and access controls'
  },
  {
    id: 'appearance',
    name: 'Appearance',
    icon: Palette,
    description: 'Customize the look and feel'
  },
  {
    id: 'data',
    name: 'Data Management',
    icon: Database,
    description: 'Backup and data settings'
  },
  {
    id: 'users',
    name: 'User Management',
    icon: Users,
    description: 'Manage users and permissions'
  },
  {
    id: 'integrations',
    name: 'Integrations',
    icon: Globe,
    description: 'External services and APIs'
  }
];

export function SettingsApp() {
  const [activeCategory, setActiveCategory] = React.useState<string>(settingsCategories[0].id);
  const [currentLanguage, setCurrentLanguage] = React.useState('en');
  const [currentLogo, setCurrentLogo] = React.useState<string>();
  const [theme, setTheme] = React.useState({
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#111827'
  });

  const handleLogoChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Settings className="w-8 h-8" />
          Advanced Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation - Mobile Dropdown */}
        <div className="lg:hidden mb-4">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {settingsCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Settings Navigation - Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <nav className="space-y-1">
            {settingsCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  activeCategory === category.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <category.icon className="w-5 h-5 mr-2" />
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              {activeCategory === 'general' && (
                <SettingsSection title="General Settings">
                  <SettingsCard
                    title="Platform Logo"
                    description="Upload your organization's logo"
                    action={
                      <LogoUpload
                        currentLogo={currentLogo}
                        onLogoChange={handleLogoChange}
                        onLogoRemove={() => setCurrentLogo(undefined)}
                      />
                    }
                  />
                  <SettingsCard
                    title="Platform Name"
                    description="Change the name of your platform instance"
                    action={
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        defaultValue="ModularApp"
                      />
                    }
                  />
                  <SettingsCard
                    title="Language"
                    description="Select your preferred language"
                    action={
                      <LanguageSelector
                        currentLanguage={currentLanguage}
                        onLanguageChange={setCurrentLanguage}
                      />
                    }
                  />
                  <SettingsCard
                    title="Time Zone"
                    description="Set your preferred time zone for accurate timestamps"
                    action={
                      <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                        <option>UTC</option>
                        <option>America/New_York</option>
                        <option>Europe/London</option>
                      </select>
                    }
                  />
                </SettingsSection>
              )}

              {activeCategory === 'appearance' && (
                <SettingsSection title="Appearance Settings">
                  <SettingsCard
                    title="Color Theme"
                    description="Customize the platform's color scheme"
                    action={
                      <ThemeCustomizer
                        theme={theme}
                        onThemeChange={setTheme}
                      />
                    }
                  />
                </SettingsSection>
              )}

              {activeCategory === 'security' && (
                <div className="space-y-6">
                  <SettingsSection title="Authentication">
                    <SettingsCard
                      title="Two-Factor Authentication"
                      description="Add an extra layer of security to your account"
                      action={
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Enable 2FA for all users</span>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                              Configure 2FA
                            </button>
                          </div>
                        </div>
                      }
                    />
                    <SettingsCard
                      title="Password Policy"
                      description="Configure password requirements and expiration"
                      action={
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Minimum password length</span>
                            <input
                              type="number"
                              min="8"
                              max="32"
                              defaultValue="12"
                              className="w-20 rounded-md border-gray-300"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Password expiration (days)</span>
                            <input
                              type="number"
                              min="0"
                              max="365"
                              defaultValue="90"
                              className="w-20 rounded-md border-gray-300"
                            />
                          </div>
                        </div>
                      }
                    />
                  </SettingsSection>
                  
                  <SettingsSection title="Access Control">
                    <SettingsCard
                      title="IP Whitelist"
                      description="Restrict access to specific IP addresses"
                      action={
                        <div className="space-y-4">
                          <textarea
                            rows={3}
                            placeholder="Enter IP addresses (one per line)"
                            className="w-full rounded-md border-gray-300"
                          />
                        </div>
                      }
                    />
                  </SettingsSection>
                </div>
              )}

              {activeCategory === 'data' && (
                <SettingsSection title="Data Management">
                  <DatabaseIntegration />
                  <SettingsCard
                    title="Two-Factor Authentication"
                    description="Add an extra layer of security to your account"
                    action={
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Enable 2FA
                      </button>
                    }
                  />
                </SettingsSection>
              )}

              {activeCategory === 'users' && (
                <div className="space-y-6">
                  <SettingsSection title="User Management">
                    <SettingsCard
                      title="User Roles"
                      description="Configure user roles and permissions"
                      action={
                        <div className="space-y-4">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Manage Roles
                          </button>
                        </div>
                      }
                    />
                  </SettingsSection>
                </div>
              )}

              {activeCategory === 'integrations' && (
                <div className="space-y-6">
                  <SettingsSection title="API Integrations">
                    <SettingsCard
                      title="API Keys"
                      description="Manage API keys for external services"
                      action={
                        <div className="space-y-4">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Generate New Key
                          </button>
                        </div>
                      }
                    />
                  </SettingsSection>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Apply Changes
                </button>
              </div>

              {/* Add more category sections as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}