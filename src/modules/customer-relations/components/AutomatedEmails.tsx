import React, { useState } from 'react';
import { Calendar, Clock, Mail, Plus, Trash2 } from 'lucide-react';
import type { EmailTemplate } from '../../../types';

interface AutomatedEmail {
  id: string;
  name: string;
  template: EmailTemplate;
  trigger: 'signup' | 'purchase' | 'abandoned_cart' | 'custom';
  schedule: {
    type: 'immediate' | 'delay' | 'specific_time';
    delay?: number; // in minutes
    time?: string; // HH:mm format
  };
  active: boolean;
}

const initialAutomations: AutomatedEmail[] = [
  {
    id: '1',
    name: 'Welcome Email',
    template: {
      id: '1',
      name: 'Welcome Template',
      subject: 'Welcome to our platform!',
      content: 'Thank you for joining...',
      variables: ['customerName']
    },
    trigger: 'signup',
    schedule: {
      type: 'immediate'
    },
    active: true
  }
];

export function AutomatedEmails() {
  const [automations, setAutomations] = useState<AutomatedEmail[]>(initialAutomations);
  const [showNewAutomation, setShowNewAutomation] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Automated Emails</h2>
        <button
          onClick={() => setShowNewAutomation(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Automation
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {automations.map((automation) => (
            <li key={automation.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{automation.name}</h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {automation.template.name}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {automation.trigger.replace('_', ' ')}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {automation.schedule.type === 'immediate' ? 'Immediate' :
                       automation.schedule.type === 'delay' ? `${automation.schedule.delay}m delay` :
                       automation.schedule.time}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={automation.active}
                        onChange={() => {
                          setAutomations(current =>
                            current.map(a =>
                              a.id === automation.id ? { ...a, active: !a.active } : a
                            )
                          );
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <button
                    onClick={() => setAutomations(current => current.filter(a => a.id !== automation.id))}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showNewAutomation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">New Automated Email</h3>
            {/* Form content would go here */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowNewAutomation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNewAutomation(false)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}