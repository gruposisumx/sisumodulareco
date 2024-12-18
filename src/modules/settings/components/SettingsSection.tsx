import React from 'react';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}