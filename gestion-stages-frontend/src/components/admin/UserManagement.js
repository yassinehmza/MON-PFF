import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavigation from './AdminNavigation'; // Adjust the import path as needed

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    role: '',
    nom: '',
    prenom: '',
    email: '',
    password: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserRole, setEditUserRole] = useState(null);

  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/admin/accounts', { headers });
      setUsers(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await axios.put(
          `http://localhost:8000/api/admin/accounts/${editUserRole}/${editUserId}`,
          formData,
          { headers }
        );
        alert("Utilisateur modifié avec succès.");
      } else {
        await axios.post('http://localhost:8000/api/admin/accounts', formData, { headers });
        alert("Utilisateur créé avec succès.");
      }

      fetchUsers();
      resetForm();
    } catch (error) {
      alert("Erreur : " + (error.response?.data?.message || 'Une erreur est survenue'));
    }
  };

  const handleEdit = (user) => {
    const [nom, ...rest] = user.name.split(' ');
    const prenom = rest.join(' ');
    setFormData({
      role: user.role,
      nom: nom || '',
      prenom: prenom || '',
      email: user.email,
      password: ''
    });
    setEditUserId(user.id);
    setEditUserRole(user.role);
    setEditMode(true);
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Supprimer ${user.name} ?`)) return;

    try {
      await axios.delete(
        `http://localhost:8000/api/admin/accounts/${user.role}/${user.id}`,
        { headers }
      );
      alert("Utilisateur supprimé avec succès.");
      fetchUsers();
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  const resetForm = () => {
    setFormData({
      role: '',
      nom: '',
      prenom: '',
      email: '',
      password: ''
    });
    setEditMode(false);
    setEditUserId(null);
    setEditUserRole(null);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with AdminNavigation */}
      <div className="w-64 bg-gray-800 text-white">
        <AdminNavigation />
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Gestion des utilisateurs</h2>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full" required />

              <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full" required />

              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full" required />

              {!editMode && (
                <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full" required />
              )}

              <select name="role" value={formData.role} onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full" required disabled={editMode}>
                <option value="">-- Rôle --</option>
                <option value="stagiaire">Stagiaire</option>
                <option value="formateur">Formateur</option>
                <option value="administrateur">Administrateur</option>
              </select>
            </div>

            <div className="flex gap-4 mt-4">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {editMode ? 'Modifier' : 'Créer'}
              </button>
              {editMode && (
                <button type="button" onClick={resetForm}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                  Annuler
                </button>
              )}
            </div>
          </form>

          <h3 className="text-xl font-semibold mb-4">Liste des utilisateurs</h3>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border-b">Nom</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Rôle</th>
                  <th className="p-3 border-b">Créé le</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={`${u.role}-${u.id}`} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{u.name}</td>
                    <td className="p-3 border-b">{u.email}</td>
                    <td className="p-3 border-b capitalize">{u.role}</td>
                    <td className="p-3 border-b">{u.created_at?.split('T')[0]}</td>
                    <td className="p-3 border-b space-x-2">
                      <button onClick={() => handleEdit(u)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                        Modifier
                      </button>
                      <button onClick={() => handleDelete(u)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">Aucun utilisateur trouvé</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;