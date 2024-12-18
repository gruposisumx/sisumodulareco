import React, { useState } from 'react';
import { Star, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Feedback {
  id: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  createdAt: string;
}

const initialFeedback: Feedback[] = [
  {
    id: '1',
    customerId: '1',
    customerName: 'John Doe',
    rating: 4,
    comment: 'Great service and product quality!',
    sentiment: 'positive',
    createdAt: new Date().toISOString()
  }
];

export function CustomerFeedback() {
  const [feedback, setFeedback] = useState<Feedback[]>(initialFeedback);
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');

  const averageRating = feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length;
  const positiveCount = feedback.filter(f => f.sentiment === 'positive').length;
  const negativeCount = feedback.filter(f => f.sentiment === 'negative').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Average Rating</h3>
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
          <p className="text-sm text-gray-500">out of 5 stars</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Positive Feedback</h3>
            <ThumbsUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{positiveCount}</p>
          <p className="text-sm text-gray-500">positive reviews</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Negative Feedback</h3>
            <ThumbsDown className="w-5 h-5 text-red-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{negativeCount}</p>
          <p className="text-sm text-gray-500">negative reviews</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Recent Feedback</h2>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="day">Last 24 Hours</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>

        <ul className="divide-y divide-gray-200">
          {feedback.map((item) => (
            <li key={item.id} className="p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-gray-500" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{item.customerName}</p>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < item.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{item.comment}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                      item.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.sentiment}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}