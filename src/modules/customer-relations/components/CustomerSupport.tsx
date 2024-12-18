import React, { useState } from 'react';
import { MessageSquare, User, Clock, Tag } from 'lucide-react';
import type { SupportTicket } from '../../../types';

const initialTickets: SupportTicket[] = [
  {
    id: '1',
    customerId: '1',
    subject: 'Product Inquiry',
    status: 'open',
    priority: 'medium',
    messages: [
      {
        id: '1',
        sender: 'customer',
        content: 'I have a question about your product...',
        timestamp: new Date().toISOString()
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export function CustomerSupport() {
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!selectedTicket || !newMessage.trim()) return;

    const updatedTicket = {
      ...selectedTicket,
      messages: [
        ...selectedTicket.messages,
        {
          id: String(Date.now()),
          sender: 'agent',
          content: newMessage,
          timestamp: new Date().toISOString()
        }
      ],
      updatedAt: new Date().toISOString()
    };

    setTickets(current =>
      current.map(ticket =>
        ticket.id === selectedTicket.id ? updatedTicket : ticket
      )
    );
    setSelectedTicket(updatedTicket);
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-16rem)]">
      {/* Ticket List */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Support Tickets</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                selectedTicket?.id === ticket.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-900">{ticket.subject}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  ticket.status === 'open'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {ticket.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Last updated: {new Date(ticket.updatedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Ticket Details */}
      {selectedTicket ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium text-gray-900">{selectedTicket.subject}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Ticket #{selectedTicket.id} · Opened {new Date(selectedTicket.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <select
                  value={selectedTicket.status}
                  onChange={(e) => {
                    const updatedTicket = { ...selectedTicket, status: e.target.value as 'open' | 'closed' };
                    setTickets(current =>
                      current.map(ticket =>
                        ticket.id === selectedTicket.id ? updatedTicket : ticket
                      )
                    );
                    setSelectedTicket(updatedTicket);
                  }}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
                <select
                  value={selectedTicket.priority}
                  onChange={(e) => {
                    const updatedTicket = { ...selectedTicket, priority: e.target.value as 'low' | 'medium' | 'high' };
                    setTickets(current =>
                      current.map(ticket =>
                        ticket.id === selectedTicket.id ? updatedTicket : ticket
                      )
                    );
                    setSelectedTicket(updatedTicket);
                  }}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedTicket.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-lg rounded-lg p-4 ${
                  message.sender === 'agent'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {message.sender === 'agent' ? 'Support Agent' : 'Customer'}
                    </span>
                    <Clock className="w-4 h-4" />
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <p>Select a ticket to view details</p>
        </div>
      )}
    </div>
  );
}