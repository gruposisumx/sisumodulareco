import React, { useState } from 'react';
import { HeartHandshake, Mail, MessageSquare, FileText, Target } from 'lucide-react';
import { EmailTemplates } from './components/EmailTemplates';
import { CustomerSupport } from './components/CustomerSupport';
import { MarketingIntegration } from './components/MarketingIntegration';
import type { EmailTemplate, SupportTicket } from '../../types';

export function CustomerRelationsApp() {
  const [activeTab, setActiveTab] = useState<'templates' | 'support' | 'automated' | 'feedback' | 'marketing'>('templates');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'templates':
        return <EmailTemplates />;
      case 'support':
        return <CustomerSupport />;
      case 'automated':
        return null;
      case 'feedback':
        return null;
      case 'marketing':
        return <MarketingIntegration />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <HeartHandshake className="w-8 h-8" />
          Customer Relations
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Mail className="w-5 h-5 mx-auto mb-1" />
              Email Templates
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`flex-1 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'support'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageSquare className="w-5 h-5 mx-auto mb-1" />
              Customer Support
            </button>
            <button
              onClick={() => setActiveTab('automated')}
              className={`flex-1 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'automated'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="w-5 h-5 mx-auto mb-1" />
              Automated Emails
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`flex-1 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'feedback'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <HeartHandshake className="w-5 h-5 mx-auto mb-1" />
              Customer Feedback
            </button>
            <button
              onClick={() => setActiveTab('marketing')}
              className={`flex-1 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'marketing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Target className="w-5 h-5 mx-auto mb-1" />
              Marketing
            </button>
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}