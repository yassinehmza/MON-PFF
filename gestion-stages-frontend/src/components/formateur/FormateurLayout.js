import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Users, FileText, Bell, Calendar, Clock, ChevronRight, CheckCircle, PieChart, BarChart as BarChartIcon } from 'lucide-react';
import { Line, Pie, Bar } from 'react-chartjs-2';
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
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="pl-64">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Formateur</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-8">
            {showNotification && (
              <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 transform transition-transform duration-500 ease-in-out translate-x-0 w-96">
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
              </div>
            )}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Stagiaires suivis</dt>
                      <dd className="text-lg font-semibold text-gray-900">{statsData.stagiaires}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Documents en attente</dt>
                      <dd className="text-lg font-semibold text-gray-900">{statsData.documentsEnAttente}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Évaluations à passer</dt>
                      <dd className="text-lg font-semibold text-gray-900">{statsData.evaluationsAPasser}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Stages en cours</dt>
                      <dd className="text-lg font-semibold text-gray-900">{statsData.stagesEnCours}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6 flex justify-end space-x-2">
            <button
              onClick={() => setSelectedPeriod('semaine')}
              className={`px-4 py-2 rounded-lg ${selectedPeriod === 'semaine' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Semaine
            </button>
            <button
              onClick={() => setSelectedPeriod('mois')}
              className={`px-4 py-2 rounded-lg ${selectedPeriod === 'mois' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Mois
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Progression des validations</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Mis à jour il y a 1h</span>
                </div>
              </div>
              <div className="h-64">
                <Line options={chartOptions} data={progressionData} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Répartition des évaluations</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <PieChart className="h-4 w-4 mr-1" />
                  <span>Total: {evaluationsData.datasets[0].data.reduce((a, b) => a + b, 0)}</span>
                </div>
              </div>
              <div className="h-64">
                <Pie data={evaluationsData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Documents traités</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <BarChartIcon className="h-4 w-4 mr-1" />
                  <span>Cette semaine</span>
                </div>
              </div>
              <div className="h-64">
                <Bar data={documentsData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
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