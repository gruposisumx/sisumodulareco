import React from 'react';
import { Package, Users, ShoppingCart, Settings, HeartHandshake, Home } from 'lucide-react';
import { InventoryApp } from './modules/inventory/InventoryApp';
import { CustomersApp } from './modules/customers/CustomersApp';
import { StoreApp } from './modules/store/StoreApp';
import { SettingsApp } from './modules/settings/SettingsApp';
import { CustomerRelationsApp } from './modules/customer-relations/CustomerRelationsApp';
import { MainNav } from './components/Navigation/MainNav';
import type { AppModule } from './types';

const modules: AppModule[] = [
  {
    name: 'Inventory',
    description: 'Manage your product inventory, track stock levels, and handle purchase orders',
    path: '/inventory',
    component: InventoryApp,
    icon: Package,
    standalone: true,
    isActive: true
  },
  {
    name: 'Customers',
    description: 'Manage customer relationships, profiles, and interaction history',
    path: '/customers',
    component: CustomersApp,
    icon: Users,
    standalone: true,
    isActive: true
  },
  {
    name: 'Store',
    description: 'Run your online store, process orders, and manage products',
    path: '/store',
    component: StoreApp,
    icon: ShoppingCart,
    standalone: true,
    isActive: true
  }, 
  {
    name: 'Customer Relations',
    description: 'Handle customer support, feedback, and automated communications',
    path: '/customer-relations',
    component: CustomerRelationsApp,
    icon: HeartHandshake,
    standalone: true,
    isActive: true
  }
];

function App() {
  const [currentModule, setCurrentModule] = React.useState<string | null>(null);
  const [activeModules, setActiveModules] = React.useState(
    modules.reduce((acc, module) => ({ ...acc, [module.path]: module.isActive }), {})
  );

  const toggleModule = (path: string) => {
    setActiveModules(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const CurrentModuleComponent = currentModule
    ? modules.find(m => m.path === currentModule && activeModules[m.path])?.component
    : null;

  return (
    <div className="min-h-screen bg-gray-100">
      <MainNav
        modules={modules}
        activeModules={activeModules}
        currentModule={currentModule}
        onModuleChange={setCurrentModule}
        onSettingsClick={() => setCurrentModule('/settings')}
        onHomeClick={() => setCurrentModule(null)}
      />

      <main className="py-6">
        {currentModule === '/settings' ? (
          <SettingsApp />
        ) : CurrentModuleComponent ? (
          <CurrentModuleComponent />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Welcome to ModularApp
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Manage and access your business modules
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {modules.map(module => (
                <div
                  key={module.path}
                  className={`relative rounded-lg border ${
                    activeModules[module.path]
                      ? 'border-green-500 bg-white shadow-lg shadow-green-100'
                      : 'border-gray-200 bg-gray-50'
                  } transition-all duration-300 ease-in-out`}
                >
                  <div
                    className={`absolute inset-0 rounded-lg ${
                      activeModules[module.path]
                        ? 'bg-gradient-to-br from-green-50 to-transparent'
                        : ''
                    } transition-opacity duration-300`}
                  />
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <module.icon
                          className={`h-8 w-8 ${
                            activeModules[module.path]
                              ? 'text-green-600'
                              : 'text-gray-400'
                          }`}
                        />
                        <h3 className="ml-3 text-lg font-medium text-gray-900">
                          {module.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => toggleModule(module.path)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          activeModules[module.path]
                            ? 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            activeModules[module.path]
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      {module.description}
                    </p>
                    <button
                      onClick={() => activeModules[module.path] && setCurrentModule(module.path)}
                      className={`w-full rounded-md px-4 py-2 text-sm font-medium ${
                        activeModules[module.path]
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      } transition-colors duration-200`}
                    >
                      {activeModules[module.path] ? 'Open Module' : 'Module Disabled'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500">
                Toggle modules on/off to customize your workspace
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;