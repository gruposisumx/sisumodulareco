import React from 'react';
import { Settings, Menu, Bell, Home } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { NotificationsMenu } from './NotificationsMenu';
import type { AppModule } from '../../types';

interface MainNavProps {
  modules: AppModule[];
  activeModules: Record<string, boolean>;
  currentModule: string | null;
  onModuleChange: (path: string) => void;
  onSettingsClick: () => void;
  onHomeClick: () => void;
}

export function MainNav({
  modules,
  activeModules,
  currentModule,
  onModuleChange,
  onSettingsClick,
  onHomeClick
}: MainNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Close mobile menu when window resizes to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              onClick={onHomeClick}
              className="flex-shrink-0 flex items-center hover:text-gray-700"
            >
              <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">Sisu Modular Eco</h1>
            </button>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {modules.map(module => (
                activeModules[module.path] && (
                  <button
                    key={module.path}
                    onClick={() => onModuleChange(module.path)}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      currentModule === module.path
                        ? 'border-green-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <module.icon className="w-5 h-5 mr-2" />
                    {module.name}
                  </button>
                )
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <NotificationsMenu />
            </div>
            <div className="hidden sm:block">
              <UserMenu />
            </div>
            <button
              onClick={onSettingsClick}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 hidden sm:block"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-white border-b border-gray-200 shadow-lg">
          <div className="pt-2 pb-3 space-y-1">
            {modules.map(module => (
              <button
                key={module.path}
                onClick={() => {
                  onModuleChange(module.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  currentModule === module.path
                    ? 'border-blue-500 text-blue-700 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <module.icon className="w-5 h-5 mr-2" />
                  {module.name}
                </div>
              </button>
            ))}
            <div className="px-3 py-2 space-y-2">
              <div className="sm:hidden">
                <NotificationsMenu />
              </div>
              <div className="sm:hidden">
                <UserMenu />
              </div>
              <button
                onClick={() => {
                  onSettingsClick();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-2 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 sm:hidden"
              >
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}