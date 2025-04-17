import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Users, FileText, ClipboardCheck, Award, LogOut } from 'lucide-react';
import { authService } from '../../services/api';

function FormateurNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authService.logout();
    navigate('/formateur/login');
  };

  const navigationItems = [
    {
      path: '/formateur/dashboard',
      icon: Users,
      label: 'Tableau de Bord',
    },
    {
      path: '/formateur/stagiaires',
      icon: Users,
      label: 'Gestion des Stagiaires',
    },
    {
      path: '/formateur/documents',
      icon: FileText,
      label: 'Validation des Documents',
    },
    {
      path: '/formateur/evaluations',
      icon: ClipboardCheck,
      label: 'Évaluation des Stages',
    },
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Espace Formateur</h2>
        <p className="text-sm text-gray-600 mt-1">Gestion des stages OFPPT</p>
      </div>
      
      <div className="mt-6 space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${isActiveRoute(item.path) ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' : ''}`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
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

export default FormateurNavigation;