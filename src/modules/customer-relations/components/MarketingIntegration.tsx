import React, { useState } from 'react';
import { Target, TrendingUp, Users, Mail } from 'lucide-react';

interface MarketingCampaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'ads';
  status: 'active' | 'draft' | 'completed';
  audience: string[];
  metrics: {
    reach: number;
    engagement: number;
    conversion: number;
  };
  startDate: string;
  endDate: string;
}

const initialCampaigns: MarketingCampaign[] = [
  {
    id: '1',
    name: 'Spring Sale Newsletter',
    type: 'email',
    status: 'active',
    audience: ['recent_customers', 'newsletter_subscribers'],
    metrics: {
      reach: 5000,
      engagement: 1200,
      conversion: 150
    },
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export function MarketingIntegration() {
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(initialCampaigns);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Campaign Reach</h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {campaigns.reduce((acc, curr) => acc + curr.metrics.reach, 0).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">total audience reached</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Engagement Rate</h3>
            <Target className="w-5 h-5 text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {Math.round(campaigns.reduce((acc, curr) => 
              acc + (curr.metrics.engagement / curr.metrics.reach) * 100, 0
            ) / campaigns.length)}%
          </p>
          <p className="text-sm text-gray-500">average engagement</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Conversion Rate</h3>
            <TrendingUp className="w-5 h-5 text-indigo-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {Math.round(campaigns.reduce((acc, curr) => 
              acc + (curr.metrics.conversion / curr.metrics.reach) * 100, 0
            ) / campaigns.length)}%
          </p>
          <p className="text-sm text-gray-500">average conversion</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Active Campaigns</h2>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <Mail className="w-4 h-4 mr-2" />
              New Campaign
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
                  <div className="mt-1 flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {campaign.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Reach</p>
                    <p className="text-sm text-gray-500">{campaign.metrics.reach.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Engagement</p>
                    <p className="text-sm text-gray-500">{campaign.metrics.engagement.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Conversions</p>
                    <p className="text-sm text-gray-500">{campaign.metrics.conversion.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}