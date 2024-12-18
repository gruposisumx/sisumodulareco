import React from 'react';
import { User, LogOut, Settings, UserCircle, Bell, Shield, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

const mockUser: UserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Administrator',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

export function UserMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [user] = React.useState<UserProfile>(mockUser);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-slide-in">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <UserCircle className="w-10 h-10 text-gray-400" />
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="py-2">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <UserCircle className="w-4 h-4 mr-2" />
              View Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Bell className="w-4 h-4 mr-2" />
              Notification Settings
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Shield className="w-4 h-4 mr-2" />
              Security Settings
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Key className="w-4 h-4 mr-2" />
              Change Password
            </button>
          </div>
          <div className="py-2 border-t border-gray-200">
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}