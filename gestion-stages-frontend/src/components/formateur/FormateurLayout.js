import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, FileText, Bell, Calendar, Clock, ChevronRight, CheckCircle, PieChart, BarChart as BarChartIcon, Home, ClipboardList, Settings, LogOut } from 'lucide-react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import StagiairesPopup from './StagiairesPopup';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

function FormateurLayout() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('semaine');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    total_stages: 0,
    total_students: 0,
    pending_documents: 0,
    validated_documents: 0,
    rejected_documents: 0,
    evaluations_distribution: {},
    documents_per_day: {},
    recent_activities: []
  });
  const [showStagiairesPopup, setShowStagiairesPopup] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/formateur/dashboard-stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const evaluationsData = {
    labels: Object.keys(dashboardData.evaluations_distribution || {}),
    datasets: [{
      data: Object.values(dashboardData.evaluations_distribution || {}),
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ]
    }]
  };

  const documentsData = {
    labels: Object.keys(dashboardData.documents_per_day || {}).reverse(),
    datasets: [{
      label: 'Documents traités',
      data: Object.values(dashboardData.documents_per_day || {}).reverse(),
      backgroundColor: 'rgba(147, 51, 234, 0.5)'
    }]
  };

  const progressionData = {
    labels: Object.keys(dashboardData.documents_per_day || {}).reverse(),
    datasets: [
      {
        label: 'Documents validés',
        data: Object.values(dashboardData.documents_per_day || {}).reverse(),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Progression des validations'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const location = useLocation();

  const menuItems = [
    { path: '/formateur', icon: Home, label: 'Tableau de bord' },
    { path: '/formateur/stagiaires', icon: Users, label: 'Stagiaires' },
    { path: '/formateur/rapports', icon: ClipboardList, label: 'Rapports' },
    { path: '/formateur/settings', icon: Settings, label: 'Paramètres' }
  ];

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      localStorage.removeItem('token');
      navigate('/login/formateur');
    } catch (err) {
      console.error('Logout error:', err);
      // Still remove token and redirect even if the API call fails
      localStorage.removeItem('token');
      navigate('/login/formateur');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-30">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-indigo-600">Mon PFF</h2>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 ${location.pathname === item.path ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' : ''}`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 mt-auto"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 pl-64">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Formateur</h1>
              <button
                onClick={() => setShowStagiairesPopup(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Users className="h-5 w-5 mr-2" />
                Gérer les Stagiaires
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-4 shadow-inner">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <div className="ml-6 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Stagiaires suivis</dt>
                      <dd className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.total_students}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl p-4 shadow-inner">
                    <FileText className="h-7 w-7 text-white" />
                  </div>
                  <div className="ml-6 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Documents en attente</dt>
                      <dd className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.pending_documents}</dd>
                      <div className="flex items-center mt-2 text-xs text-amber-600">
                        <span className="font-medium">Urgent</span>
                        <span className="ml-2">à traiter</span>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-4 shadow-inner">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <div className="ml-6 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Stages en cours</dt>
                      <dd className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.total_stages}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Progression des validations</h3>
                <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Cette semaine</span>
                </div>
              </div>
              <div className="h-64">
                <Line data={progressionData} options={chartOptions} />
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Répartition des évaluations</h3>
                <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                  <PieChart className="h-4 w-4 mr-1" />
                  <span>Total: {Object.values(dashboardData.evaluations_distribution || {}).reduce((a, b) => a + b, 0)}</span>
                </div>
              </div>
              <div className="h-64">
                <Pie 
                  data={evaluationsData} 
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          usePointStyle: true,
                          padding: 20,
                          font: {
                            size: 12
                          }
                        }
                      }
                    }
                  }} 
                />
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Documents traités</h3>
                <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                  <BarChartIcon className="h-4 w-4 mr-1" />
                  <span>Cette semaine</span>
                </div>
              </div>
              <div className="h-64">
                <Bar 
                  data={documentsData} 
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          display: true,
                          color: 'rgba(0, 0, 0, 0.1)'
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    }
                  }} 
                />
              </div>
            </motion.div>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
            <Outlet />
          </div>
        </div>

        {/* Stagiaires Popup */}
        <StagiairesPopup
          isOpen={showStagiairesPopup}
          onClose={() => setShowStagiairesPopup(false)}
        />
      </main>
    </div>
  );
}

export default FormateurLayout;