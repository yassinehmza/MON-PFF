import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Users, FileText, Bell, Calendar, Clock, ChevronRight, CheckCircle, PieChart, BarChart as BarChartIcon, Home, ClipboardList, Settings, LogOut } from 'lucide-react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [showNotification, setShowNotification] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('semaine');
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Document en attente de validation", date: "2024-01-15", status: "pending" },
    { id: 2, message: "Évaluation à compléter", date: "2024-01-20", status: "upcoming" },
    { id: 3, message: "Document validé", date: "2024-01-14", status: "completed" }
  ]);

  const statsData = {
    stagiaires: 15,
    documentsEnAttente: 8,
    evaluationsAPasser: 5,
    stagesEnCours: 12
  };

  const progressionData = {
    labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
    datasets: [
      {
        label: 'Documents validés',
        data: [5, 8, 12, 15],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  };

  const evaluationsData = {
    labels: ['Excellent', 'Très Bien', 'Bien', 'Moyen', 'À améliorer'],
    datasets: [{
      data: [4, 6, 3, 2, 1],
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
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
    datasets: [{
      label: 'Documents traités',
      data: [4, 6, 3, 5, 4],
      backgroundColor: 'rgba(147, 51, 234, 0.5)'
    }]
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 1000);

    // Simuler la mise à jour des données
    const updateData = () => {
      setStatsData(prevStats => ({
        ...prevStats,
        stagiaires: prevStats.stagiaires + 1,
        documentsEnAttente: Math.max(0, prevStats.documentsEnAttente - 1)
      }));
    };

    const dataUpdateInterval = setInterval(updateData, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(dataUpdateInterval);
    };
  }, []);

  const location = useLocation();

  const menuItems = [
    { path: '/formateur', icon: Home, label: 'Tableau de bord' },
    { path: '/formateur/stagiaires', icon: Users, label: 'Stagiaires' },
    { path: '/formateur/rapports', icon: ClipboardList, label: 'Rapports' },
    { path: '/formateur/settings', icon: Settings, label: 'Paramètres' }
  ];

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
            className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 mt-auto"
            onClick={() => console.log('Déconnexion')}
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 pl-64">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Formateur</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-8">
            {showNotification && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 w-96"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-lg">Notifications</span>
                  <button onClick={() => setShowNotification(false)} className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full transition-colors">
                    ×
                  </button>
                </div>
                <div className="space-y-3">
                  {notifications.map(notif => (
                    <div key={notif.id} className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className={`flex-shrink-0 rounded-full p-2 ${notif.status === 'completed' ? 'bg-green-100 text-green-600' : notif.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
                        {notif.status === 'completed' ? <CheckCircle className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.date}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
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
                      <dd className="text-2xl font-bold text-gray-900 mt-1">{statsData.stagiaires}</dd>
                      <div className="flex items-center mt-2 text-xs text-indigo-600">
                        <span className="font-medium">+12%</span>
                        <span className="ml-2">vs mois dernier</span>
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
                  <div className="flex-shrink-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl p-4 shadow-inner">
                    <FileText className="h-7 w-7 text-white" />
                  </div>
                  <div className="ml-6 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Documents en attente</dt>
                      <dd className="text-2xl font-bold text-gray-900 mt-1">{statsData.documentsEnAttente}</dd>
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
                  <div className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 shadow-inner">
                    <Calendar className="h-7 w-7 text-white" />
                  </div>
                  <div className="ml-6 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Évaluations à passer</dt>
                      <dd className="text-2xl font-bold text-gray-900 mt-1">{statsData.evaluationsAPasser}</dd>
                      <div className="flex items-center mt-2 text-xs text-purple-600">
                        <span className="font-medium">Cette semaine</span>
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
                      <dd className="text-2xl font-bold text-gray-900 mt-1">{statsData.stagesEnCours}</dd>
                      <div className="flex items-center mt-2 text-xs text-emerald-600">
                        <span className="font-medium">En progression</span>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="mb-6 flex justify-end space-x-2">
            <div className="bg-gray-50 p-1 rounded-xl shadow-sm inline-flex space-x-1">
              <button
                onClick={() => setSelectedPeriod('semaine')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedPeriod === 'semaine' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-indigo-600'}`}
              >
                Semaine
              </button>
              <button
                onClick={() => setSelectedPeriod('mois')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedPeriod === 'mois' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-indigo-600'}`}
              >
                Mois
              </button>
            </div>
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
                  <span>Mis à jour il y a 1h</span>
                </div>
              </div>
              <div className="h-64">
                <Line options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      ...chartOptions.plugins.legend,
                      labels: {
                        usePointStyle: true,
                        font: {
                          size: 12
                        }
                      }
                    }
                  }
                }} data={progressionData} />
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
                  <span>Total: {evaluationsData.datasets[0].data.reduce((a, b) => a + b, 0)}</span>
                </div>
              </div>
              <div className="h-64">
                <Pie data={evaluationsData} options={{
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
                }} />
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
                <Bar data={documentsData} options={{
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
                }} />
              </div>
            </motion.div>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default FormateurLayout;