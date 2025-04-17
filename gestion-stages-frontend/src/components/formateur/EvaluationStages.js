import React, { useState } from 'react';
import { Save, Send, Star, History, Edit3, AlertCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EvaluationStages() {
  const [selectedStagiaire, setSelectedStagiaire] = useState(null);
  const [evaluation, setEvaluation] = useState({
    competencesTechniques: 0,
    autonomie: 0,
    communication: 0,
    travailEquipe: 0,
    ponctualite: 0,
    commentaire: '',
    signature: '',
  });
  const [isDraft, setIsDraft] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [stagiaires, setStagiaires] = useState([]);
  const [evaluationsPassees, setEvaluationsPassees] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (!isMounted) return;
        setIsLoading(true);
        setLoadingError(null);
        
        // Simuler un appel API pour récupérer les données
        const response = await fetch('http://localhost:8000/api/stagiaires');
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        
        if (!isMounted) return;

        // En attendant l'API, utiliser des données simulées
        const stagiairesMock = [
          {
            id: 1,
            nom: 'Martin',
            prenom: 'Sophie',
            entreprise: 'Tech Solutions',
            dateDebut: '2024-01-10',
            dateFin: '2024-06-10',
          },
          {
            id: 2,
            nom: 'Dubois',
            prenom: 'Lucas',
            entreprise: 'Digital Agency',
            dateDebut: '2024-02-01',
            dateFin: '2024-07-01',
          },
        ];

        const evaluationsMock = [
          {
            id: 1,
            stagiaire: 'Emma Garcia',
            date: '2024-01-10',
            moyenne: 4.2,
            commentaire: 'Excellent travail et grande autonomie',
          },
          {
            id: 2,
            stagiaire: 'Thomas Bernard',
            date: '2024-01-05',
            moyenne: 3.8,
            commentaire: 'Bon travail, communication à améliorer',
          },
        ];

        setStagiaires(stagiairesMock);
        setEvaluationsPassees(evaluationsMock);
      } catch (error) {
        if (!isMounted) return;
        console.error('Erreur lors du chargement des données:', error);
        setLoadingError('Erreur lors du chargement des informations. Veuillez réessayer plus tard.');
        toast.error('Erreur lors du chargement des informations');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStagiaireSelection = (stagiaire) => {
    setSelectedStagiaire(stagiaire);
    // Vérifier s'il existe un brouillon
    const savedDraft = localStorage.getItem(`draft_${stagiaire.id}`);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setEvaluation(parsedDraft);
        setIsDraft(true);
        toast.info('Un brouillon a été chargé');
      } catch (error) {
        console.error('Erreur lors du chargement du brouillon:', error);
      }
    } else {
      // Réinitialiser le formulaire si pas de brouillon
      setEvaluation({
        competencesTechniques: 0,
        autonomie: 0,
        communication: 0,
        travailEquipe: 0,
        ponctualite: 0,
        commentaire: '',
        signature: '',
      });
      setIsDraft(false);
    }
  };
  const criteres = [
    { id: 'competencesTechniques', label: 'Compétences Techniques' },
    { id: 'autonomie', label: 'Autonomie' },
    { id: 'communication', label: 'Communication' },
    { id: 'travailEquipe', label: 'Travail d\'Équipe' },
    { id: 'ponctualite', label: 'Ponctualité' },
  ];

  const handleRatingChange = (critere, value) => {
    setEvaluation(prev => ({
      ...prev,
      [critere]: value,
    }));
  };

  const handleCommentChange = (e) => {
    setEvaluation(prev => ({
      ...prev,
      commentaire: e.target.value,
    }));
  };

  const handleSignatureChange = (e) => {
    setEvaluation(prev => ({
      ...prev,
      signature: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Vérifier si au moins une note est donnée
    const hasRating = Object.values(evaluation).some((value, index) => index < 5 && value > 0);
    if (!hasRating) {
      newErrors.rating = 'Veuillez attribuer au moins une note';
      isValid = false;
    }

    // Vérifier le commentaire
    if (!evaluation.commentaire.trim()) {
      newErrors.commentaire = 'Le commentaire est requis';
      isValid = false;
    }

    // Vérifier la signature
    if (!evaluation.signature.trim()) {
      newErrors.signature = 'La signature est requise';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveDraft = () => {
    try {
      // Sauvegarder le brouillon
      localStorage.setItem(`draft_${selectedStagiaire.id}`, JSON.stringify(evaluation));
      setIsDraft(true);
      toast.success('Brouillon sauvegardé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde du brouillon');
    }
  };

  const handleSubmitEvaluation = async () => {
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs avant de soumettre');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Réinitialiser le formulaire
      setIsDraft(false);
      setEvaluation({
        competencesTechniques: 0,
        autonomie: 0,
        communication: 0,
        travailEquipe: 0,
        ponctualite: 0,
        commentaire: '',
        signature: '',
      });
      setSelectedStagiaire(null);
      
      // Supprimer le brouillon s'il existe
      localStorage.removeItem(`draft_${selectedStagiaire.id}`);
      
      toast.success('Évaluation soumise avec succès');
    } catch (error) {
      toast.error('Erreur lors de la soumission de l\'évaluation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (critereId) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => handleRatingChange(critereId, value)}
            className={`focus:outline-none ${value <= evaluation[critereId] ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Évaluation des Stages</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : loadingError ? (
        <div className="text-center text-red-600 p-4">
          <AlertCircle className="h-12 w-12 mx-auto mb-2" />
          {loadingError}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Stagiaires à évaluer</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {stagiaires.map((stagiaire) => (
                <li
                  key={stagiaire.id}
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleStagiaireSelection(stagiaire)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {stagiaire.prenom} {stagiaire.nom}
                      </p>
                      <p className="text-sm text-gray-500">{stagiaire.entreprise}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(stagiaire.dateDebut).toLocaleDateString()} - {new Date(stagiaire.dateFin).toLocaleDateString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        {selectedStagiaire && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Évaluation de {selectedStagiaire.prenom} {selectedStagiaire.nom}
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {criteres.map((critere) => (
                <div key={critere.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {critere.label}
                  </label>
                  {renderStars(critere.id)}
                </div>
              ))}

              <div className="space-y-2">
                <label htmlFor="commentaire" className="block text-sm font-medium text-gray-700">
                  Commentaire
                </label>
                <div className="relative">
                  <textarea
                    id="commentaire"
                    rows="4"
                    className={`block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.commentaire ? 'border-red-500' : 'border-gray-300'}`}
                    value={evaluation.commentaire}
                    onChange={handleCommentChange}
                    placeholder="Ajouter un commentaire détaillé..."
                  />
                  {errors.commentaire && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.commentaire && (
                  <p className="mt-2 text-sm text-red-600">{errors.commentaire}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="signature" className="block text-sm font-medium text-gray-700">
                  Signature électronique
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="signature"
                    className={`block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.signature ? 'border-red-500' : 'border-gray-300'}`}
                    value={evaluation.signature}
                    onChange={handleSignatureChange}
                    placeholder="Votre nom complet"
                  />
                  {errors.signature && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.signature && (
                  <p className="mt-2 text-sm text-red-600">{errors.signature}</p>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-5 w-5 mr-2 text-gray-500" />
                  Enregistrer le brouillon
                </button>
                <button
                  onClick={handleSubmitEvaluation}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Soumission...' : 'Soumettre l\'évaluation'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="lg:col-span-2 bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Évaluations précédentes</h3>
            <History className="h-5 w-5 text-gray-400" />
          </div>
          <ul className="divide-y divide-gray-200">
            {evaluationsPassees.map((eval) => (
              <li key={eval.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{eval.stagiaire}</p>
                    <p className="text-sm text-gray-500 mt-1">{eval.commentaire}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{eval.moyenne}</span>
                    </div>
                    <span className="text-sm text-gray-500">{eval.date}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EvaluationStages;