import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Settings,
  Database,
  UserCheck,
  FileSpreadsheet,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { authService } from '../../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const [stats, setStats] = useState({
    totalUsers: 1250,
    activeUsers: 850,
    pendingApprovals: 45,
    recentActivities: 120
  });

  const [activityData, setActivityData] = useState([
    { name: 'Lun', users: 120 },
    { name: 'Mar', users: 150 },
    { name: 'Mer', users: 180 },
    { name: 'Jeu', users: 140 },
    { name: 'Ven', users: 200 },
    { name: 'Sam', users: 80 },
    { name: 'Dim', users: 60 }
  ]);

  const [stageData, setStageData] = useState([
    { name: 'En cours', value: 45 },
    { name: 'Terminés', value: 30 },
    { name: 'À venir', value: 25 }
  ]);

  useEffect(() => {
    // Ici, vous pouvez ajouter la logique pour charger les données réelles
    // depuis votre API
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-800 text-white transition-all duration-300 ease-in-out fixed h-full z-20`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className={`${!sidebarOpen && 'hidden'} font-bold text-xl`}>Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-indigo-700 rounded-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <Link
              to="/admin/users"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeMenu === 'users' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              onClick={() => setActiveMenu('users')}
            >
              <Users size={20} />
              {sidebarOpen && <span>Gérer les utilisateurs</span>}
            </Link>

            <Link
              to="/admin/data"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeMenu === 'data' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              onClick={() => setActiveMenu('data')}
            >
              <Database size={20} />
              {sidebarOpen && <span>Gérer les données</span>}
            </Link>

            <Link
              to="/admin/accounts"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeMenu === 'accounts' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              onClick={() => setActiveMenu('accounts')}
            >
              <UserCheck size={20} />
              {sidebarOpen && <span>Gérer les comptes</span>}
            </Link>

            <Link
              to="/admin/roles"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeMenu === 'roles' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              onClick={() => setActiveMenu('roles')}
            >
              <Settings size={20} />
              {sidebarOpen && <span>Rôles et permissions</span>}
            </Link>

            <Link
              to="/admin/import-export"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeMenu === 'import-export' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              onClick={() => setActiveMenu('import-export')}
            >
              <FileSpreadsheet size={20} />
              {sidebarOpen && <span>Import/Export</span>}
            </Link>
          </div>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 ease-in-out`}>
        {/* En-tête */}
        <header className="bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Admin Name</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut size={20} />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </header>

        {/* Contenu du dashboard */}
        <div className="p-6">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium">Total Utilisateurs</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
              <div className="mt-2 flex items-center text-green-500">
                <span className="text-sm font-medium">+12%</span>
                <span className="text-xs ml-2">vs mois dernier</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium">Utilisateurs Actifs</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeUsers}</p>
              <div className="mt-2 flex items-center text-green-500">
                <span className="text-sm font-medium">+8%</span>
                <span className="text-xs ml-2">vs mois dernier</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium">Approbations en Attente</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingApprovals}</p>
              <div className="mt-2 flex items-center text-yellow-500">
                <span className="text-sm font-medium">En attente</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium">Activités Récentes</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.recentActivities}</p>
              <div className="mt-2 flex items-center text-blue-500">
                <span className="text-sm font-medium">Dernières 24h</span>
              </div>
            </div>
          </div>

          {/* Graphiques et autres contenus à ajouter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Utilisateurs</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques des Stages</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;