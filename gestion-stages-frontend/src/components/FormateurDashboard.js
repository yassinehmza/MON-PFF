import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AlertCircle, User, Book, Calendar, Mail, Briefcase, LogOut, FileText, Clock } from 'lucide-react';

const FormateurDashboard = () => {
  const [formateurInfo, setFormateurInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    total_stages: 0,
    total_students: 0,
    pending_documents: 0,
    validated_documents: 0,
    rejected_documents: 0,
    evaluations_distribution: {},
    documents_per_day: {},
    recent_activities: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Session expirée. Veuillez vous reconnecter.');
      navigate('/login/formateur');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [profileResponse, statsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/formateur/profile', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:8000/api/formateur/dashboard-stats', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setFormateurInfo(profileResponse.data);
        setDashboardStats(statsResponse.data);
        toast.success('Données chargées avec succès');
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Erreur lors du chargement des informations';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <AlertCircle className="h-16 w-16 mb-4 text-red-500" />
        <p className="text-xl font-medium text-gray-800">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    toast.success('Déconnexion réussie');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Tableau de bord Formateur</h1>
                <p className="text-indigo-100 text-lg">Bienvenue, {formateurInfo?.prenom} {formateurInfo?.nom}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl group"
              >
                <LogOut className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg">
                    <Briefcase className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Total Stages</p>
                    <p className="text-3xl font-bold text-blue-900">{dashboardStats.total_stages}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className="bg-emerald-500/10 p-3 rounded-lg">
                    <User className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-600 font-medium">Total Étudiants</p>
                    <p className="text-3xl font-bold text-emerald-900">{dashboardStats.total_students}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className="bg-amber-500/10 p-3 rounded-lg">
                    <Clock className="h-8 w-8 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-amber-600 font-medium">Documents en Attente</p>
                    <p className="text-3xl font-bold text-amber-900">{dashboardStats.pending_documents}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500/10 p-3 rounded-lg">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-green-600 font-medium">Documents Validés</p>
                    <p className="text-3xl font-bold text-green-900">{dashboardStats.validated_documents}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities and Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                  <Clock className="h-7 w-7 mr-3 text-indigo-600" />
                  Activités Récentes
                </h2>
                <div className="space-y-4">
                  {dashboardStats.recent_activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          activity.status === 'valide' ? 'bg-green-100 text-green-600' :
                          activity.status === 'rejete' ? 'bg-red-100 text-red-600' :
                          'bg-amber-100 text-amber-600'
                        }`}>
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.type}</p>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        activity.status === 'valide' ? 'bg-green-100 text-green-800' :
                        activity.status === 'rejete' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                  <User className="h-7 w-7 mr-3 text-indigo-600" />
                  Informations personnelles
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 w-32">Nom</span>
                    <span className="font-medium text-gray-900">{formateurInfo.nom}</span>
                  </div>
                  <div className="flex items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 w-32">Prénom</span>
                    <span className="font-medium text-gray-900">{formateurInfo.prenom}</span>
                  </div>
                  <div className="flex items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 w-32">Email</span>
                    <span className="font-medium text-gray-900 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {formateurInfo.email}
                    </span>
                  </div>
                  <div className="flex items-center py-2">
                    <span className="text-gray-600 w-32">Spécialité</span>
                    <span className="font-medium text-gray-900">{formateurInfo.specialite}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button 
                className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-xl hover:from-indigo-700 hover:to-indigo-900 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 font-medium group transform hover:-translate-y-1"
                onClick={() => navigate('/formateur/stagiaires')}
              >
                <User className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                <span>Gestion des Stagiaires</span>
              </button>
              <button 
                className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white p-6 rounded-xl hover:from-emerald-700 hover:to-emerald-900 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 font-medium group transform hover:-translate-y-1"
                onClick={() => navigate('/formateur/stages')}
              >
                <Calendar className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                <span>Gestion des Stages</span>
              </button>
              <button 
                className="bg-gradient-to-r from-amber-600 to-amber-800 text-white p-6 rounded-xl hover:from-amber-700 hover:to-amber-900 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 font-medium group transform hover:-translate-y-1"
                onClick={() => navigate('/formateur/rapports')}
              >
                <Book className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                <span>Gestion des Rapports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormateurDashboard;