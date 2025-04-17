import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AlertCircle, User, Book, Calendar } from 'lucide-react';

const FormateurDashboard = () => {
  const [formateurInfo, setFormateurInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalStagiaires: 0,
    stagiairesActifs: 0,
    rapportsEnAttente: 0
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
        setStats(statsResponse.data);
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-600">
        <AlertCircle className="h-12 w-12 mb-4" />
        <p className="text-lg font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Tableau de bord Formateur</h1>
        {formateurInfo && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">Stagiaires Actifs</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.stagiairesActifs}</p>
                </div>
              </div>
              <div className="bg-green-50 p-6 rounded-xl flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Book className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-medium">Total Stagiaires</p>
                  <p className="text-2xl font-bold text-green-900">{stats.totalStagiaires}</p>
                </div>
              </div>
              <div className="bg-yellow-50 p-6 rounded-xl flex items-center space-x-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Rapports en Attente</p>
                  <p className="text-2xl font-bold text-yellow-900">{stats.rapportsEnAttente}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Informations personnelles</h2>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-700">
                    <span className="font-medium w-24">Nom:</span>
                    <span>{formateurInfo.nom}</span>
                  </p>
                  <p className="flex items-center text-gray-700">
                    <span className="font-medium w-24">Prénom:</span>
                    <span>{formateurInfo.prenom}</span>
                  </p>
                  <p className="flex items-center text-gray-700">
                    <span className="font-medium w-24">Email:</span>
                    <span>{formateurInfo.email}</span>
                  </p>
                  <p className="flex items-center text-gray-700">
                    <span className="font-medium w-24">Spécialité:</span>
                    <span>{formateurInfo.specialite}</span>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Actions rapides</h2>
                <div className="space-y-4">
                  <button 
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                    onClick={() => navigate('/formateur/stagiaires')}
                  >
                    <User className="h-5 w-5" />
                    <span>Gérer les stagiaires</span>
                  </button>
                  <button 
                    className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                    onClick={() => navigate('/formateur/rapports')}
                  >
                    <Book className="h-5 w-5" />
                    <span>Voir les rapports</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormateurDashboard;