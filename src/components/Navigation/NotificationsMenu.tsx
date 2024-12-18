import React from 'react';
import { Bell, X, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    title: 'New Order Received',
    message: 'Order #1234 needs processing',
    timestamp: new Date().toISOString(),
    read: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Low Stock Alert',
    message: 'Product XYZ is running low',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false
  },
  {
    id: '3',
    type: 'success',
    title: 'Order Shipped',
    message: 'Order #5678 has been shipped',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false
  }
];

export function NotificationsMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(current =>
      current.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(current =>
      current.map(n => ({ ...n, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(current =>
      current.filter(n => n.id !== id)
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative"
      >
        <div className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-slide-in">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No notifications
                </p>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`flex items-start p-3 rounded-lg transition-all ${
                      notification.read ? 'bg-white' : 'bg-blue-50'
                    } hover:bg-gray-50`}
                  >
                    <div className={`flex-shrink-0 rounded-full p-2 ${
                      notification.type === 'info' ? 'bg-blue-100' :
                      notification.type === 'success' ? 'bg-green-100' :
                      notification.type === 'warning' ? 'bg-yellow-100' :
                      'bg-red-100'
                    }`}>
                      <Bell className={`w-4 h-4 ${
                        notification.type === 'info' ? 'text-blue-600' :
                        notification.type === 'success' ? 'text-green-600' :
                        notification.type === 'warning' ? 'text-yellow-600' :
                        'text-red-600'
                      }`} />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex items-start space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}