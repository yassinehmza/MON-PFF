import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Briefcase, FileText, Settings, LogOut, BarChart2 } from 'lucide-react';
import { authService } from '../../services/api';

function AdminNavigation() {
  const location = useLocation();
  
  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navigationItems = [
    {
      path: '/admin/dashboard',
      icon: BarChart2,
      label: 'Tableau de bord',
    },
    {
      path: '/admin/users',
      icon: Users,
      label: 'Gestion des Utilisateurs',
    },
    {
      path: '/admin/stages',
      icon: Briefcase,
      label: 'Gestion des Stages',
    },
    {
      path: '/admin/documents',
      icon: FileText,
      label: 'Documents et Rapports',
    },
    {
      path: '/admin/settings',
      icon: Settings,
      label: 'Paramètres',
    },
  ];

  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Administration</h2>
        <p className="text-sm text-gray-600 mt-1">Gestion des stages OFPPT</p>
      </div>
      
      <div className="mt-6 space-y-1">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${isActiveRoute(item.path) ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' : ''}`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors mt-4"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </nav>
  );
}

export default AdminNavigation;