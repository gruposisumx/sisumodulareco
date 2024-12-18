import React from 'react';

interface SettingsCardProps {
  title: string;
  description: string;
  action: React.ReactNode;
}

export function SettingsCard({ title, description, action }: SettingsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md">
      <div className="flex flex-col space-y-2">
        <h3 className="text-base md:text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 break-words">{description}</p>
        <div className="mt-4">
          {action}
        </div>
      </div>
    </div>
  );
}