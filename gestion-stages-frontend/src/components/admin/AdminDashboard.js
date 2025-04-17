import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileSpreadsheet, Briefcase, FileText, BarChart2, Download, Upload, AlertCircle, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import AdminLayout from './AdminLayout';
import { animate, AnimatePresence, domAnimation, LazyMotion, m as motion } from 'framer-motion';

function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalStagiaires: 120,
    totalFormateurs: 25,
    stagesEnCours: 45,
    stagesTermines: 75,
    documentsEnAttente: 15
  });

  const stageData = [
    { mois: 'Jan', enCours: 30, termines: 20 },
    { mois: 'Fév', enCours: 35, termines: 25 },
    { mois: 'Mar', enCours: 40, termines: 30 },
    { mois: 'Avr', enCours: 45, termines: 35 },
    { mois: 'Mai', enCours: 42, termines: 45 },
    { mois: 'Juin', enCours: 45, termines: 75 }
  ];

  const userData = [
    { name: 'Stagiaires', value: stats.totalStagiaires },
    { name: 'Formateurs', value: stats.totalFormateurs },
    { name: 'Administrateurs', value: 5 }
  ];

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B'];

  const handleImport = async () => {
    setIsLoading(true);
    // Simuler un délai de chargement
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleExport = async () => {
    setIsLoading(true);
    // Simuler un délai de chargement
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const refreshData = () => {
    setIsLoading(true);
    // Simuler un rafraîchissement des données
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };


  return (
    <AdminLayout>

      {/* En-tête du tableau de bord */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble de la gestion des stages</p>
        </div>
        <LazyMotion features={domAnimation}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshData}
            className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
            disabled={isLoading}
          >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Actualiser</span>
        </motion.button>
        </LazyMotion>
      </div>
        {/* Widgets statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Stagiaires</h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">{stats.totalStagiaires}</p>
              </div>
              <Users className="h-10 w-10 text-indigo-500 opacity-20" />
            </div>
            <div className="mt-4 text-sm text-indigo-600">
              <span className="font-medium">+12%</span> ce mois
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Stages en Cours</h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">{stats.stagesEnCours}</p>
              </div>
              <Briefcase className="h-10 w-10 text-green-500 opacity-20" />
            </div>
            <div className="mt-4 text-sm text-green-600">
              <span className="font-medium">{Math.round((stats.stagesEnCours / (stats.stagesEnCours + stats.stagesTermines)) * 100)}%</span> du total
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Stages Terminés</h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">{stats.stagesTermines}</p>
              </div>
              <FileText className="h-10 w-10 text-blue-500 opacity-20" />
            </div>
            <div className="mt-4 text-sm text-blue-600">
              <span className="font-medium">{Math.round((stats.stagesTermines / (stats.stagesEnCours + stats.stagesTermines)) * 100)}%</span> du total
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Documents en Attente</h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">{stats.documentsEnAttente}</p>
              </div>
              <AlertCircle className="h-10 w-10 text-orange-500 opacity-20" />
            </div>
            <div className="mt-4 text-sm text-orange-600">
              <span className="font-medium">Action requise</span>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/stages"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <Briefcase className="h-8 w-8 text-indigo-600" />
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {stats.stagesEnCours + stats.stagesTermines} total
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Gestion des Stages</h3>
            <p className="text-gray-500 mt-1 text-sm">Suivre et gérer les stages</p>
            <div className="mt-4 flex space-x-3">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                {stats.stagesEnCours} actifs
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                {stats.stagesTermines} terminés
              </span>
            </div>
          </Link>

          <Link
            to="/admin/documents"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-8 w-8 text-orange-600" />
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                {stats.documentsEnAttente} en attente
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Documents</h3>
            <p className="text-gray-500 mt-1 text-sm">Gérer les documents et rapports</p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${(stats.documentsEnAttente / 20) * 100}%` }}
                ></div>
              </div>
            </div>
          </Link>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <FileSpreadsheet className="h-8 w-8 text-green-600" />
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Export/Import
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Données</h3>
            <p className="text-gray-500 mt-1 text-sm">Gestion des données</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <LazyMotion features={domAnimation}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleImport}
                  className="flex items-center justify-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  disabled={isLoading}
                >
                <Upload className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="text-sm font-medium">Importer</span>
              </motion.button>
              </LazyMotion>
              <LazyMotion features={domAnimation}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExport}
                  className="flex items-center justify-center px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                  disabled={isLoading}
                >
                <Download className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="text-sm font-medium">Exporter</span>
              </motion.button>
              </LazyMotion>
            </div>
          </div>
        </div>

        {/* Graphiques statistiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LazyMotion features={domAnimation}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Évolution des Stages</h3>
                <p className="text-sm text-gray-500 mt-1">Derniers 6 mois</p>
              </div>
              <BarChart2 className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="h-64 rounded-lg border border-gray-100">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                  <XAxis dataKey="mois" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      padding: '12px'
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: '20px'
                    }}
                  />
                  <Bar
                    dataKey="enCours"
                    name="Stages en cours"
                    fill="#4F46E5"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Bar
                    dataKey="termines"
                    name="Stages terminés"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <LazyMotion features={domAnimation}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Activité Utilisateurs</h3>
                <p className="text-sm text-gray-500 mt-1">Cette semaine</p>
              </div>
              <BarChart2 className="h-6 w-6 text-green-600" />
            </div>
            <div className="h-64 rounded-lg border border-gray-100">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={1500}
                    animationBegin={300}
                  >
                    {userData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        strokeWidth={2}
                        stroke="#fff"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      padding: '12px'
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: '20px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          </LazyMotion>
          </LazyMotion>
        </div>
    </AdminLayout>
  );
}

export default AdminDashboard;