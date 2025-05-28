import React, { useState } from 'react';
import { Star, Search } from 'lucide-react';

function Evaluations() {
  const [evaluations] = useState([
    {
      id: 1,
      stagiaire: 'Jean Dupont',
      entreprise: 'Tech Solutions',
      note: null,
      commentaire: '',
      dateEvaluation: null
    }
    // Ajoutez plus d'évaluations ici
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Évaluations</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un stagiaire..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid gap-6">
        {evaluations.map((evaluation) => (
          <div key={evaluation.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{evaluation.stagiaire}</h3>
                <p className="text-sm text-gray-500">{evaluation.entreprise}</p>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-${evaluation.note >= star ? 'yellow' : 'gray'}-400 hover:text-yellow-400`}
                  >
                    <Star className="h-6 w-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commentaire d'évaluation
                </label>
                <textarea
                  rows="4"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Saisissez votre évaluation..."
                  value={evaluation.commentaire}
                  onChange={() => {}}
                />
              </div>

              <div className="flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Enregistrer l'évaluation
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Evaluations;