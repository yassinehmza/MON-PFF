import React, { useState } from 'react';
import { User, Lock, Save } from 'lucide-react';

function ProfilePage() {
  const [personalInfo, setPersonalInfo] = useState({
    nom: '',
    prenom: '',
    email: ''
  });

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validatePersonalInfo = () => {
    const newErrors = {};
    if (!personalInfo.nom) newErrors.nom = 'Le nom est requis';
    if (!personalInfo.prenom) newErrors.prenom = 'Le prénom est requis';
    if (!personalInfo.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    return newErrors;
  };

  const validatePasswordInfo = () => {
    const newErrors = {};
    if (!passwordInfo.currentPassword) newErrors.currentPassword = 'Le mot de passe actuel est requis';
    if (!passwordInfo.newPassword) {
      newErrors.newPassword = 'Le nouveau mot de passe est requis';
    } else if (passwordInfo.newPassword.length < 6) {
      newErrors.newPassword = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (!passwordInfo.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    return newErrors;
  };

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validatePersonalInfo();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // Appel API pour mettre à jour les informations personnelles
      setSuccessMessage('Informations personnelles mises à jour avec succès');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({ submit: 'Erreur lors de la mise à jour des informations' });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validatePasswordInfo();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // Appel API pour changer le mot de passe
      setSuccessMessage('Mot de passe modifié avec succès');
      setPasswordInfo({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({ submit: 'Erreur lors du changement de mot de passe' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <p className="mt-2 text-gray-600">Gérez vos informations personnelles et votre sécurité</p>
        </div>

        {/* Message de succès */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Formulaire des informations personnelles */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <User className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Informations Personnelles</h2>
          </div>

          <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  value={personalInfo.nom}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, nom: e.target.value })}
                  className={`mt-1 block w-full rounded-lg border ${errors.nom ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                />
                {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
              </div>

              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  type="text"
                  id="prenom"
                  value={personalInfo.prenom}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, prenom: e.target.value })}
                  className={`mt-1 block w-full rounded-lg border ${errors.prenom ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                />
                {errors.prenom && <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                className={`mt-1 block w-full rounded-lg border ${errors.email ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>

        {/* Formulaire de changement de mot de passe */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Changer le mot de passe</h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Mot de passe actuel
              </label>
              <input
                type="password"
                id="currentPassword"
                value={passwordInfo.currentPassword}
                onChange={(e) => setPasswordInfo({ ...passwordInfo, currentPassword: e.target.value })}
                className={`mt-1 block w-full rounded-lg border ${errors.currentPassword ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
              />
              {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwordInfo.newPassword}
                  onChange={(e) => setPasswordInfo({ ...passwordInfo, newPassword: e.target.value })}
                  className={`mt-1 block w-full rounded-lg border ${errors.newPassword ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                />
                {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwordInfo.confirmPassword}
                  onChange={(e) => setPasswordInfo({ ...passwordInfo, confirmPassword: e.target.value })}
                  className={`mt-1 block w-full rounded-lg border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Changer le mot de passe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;