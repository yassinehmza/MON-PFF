import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home.js';
import FormateurLogin from './LoginPages/FormateurLogin';
import EtudiantLogin from './LoginPages/EtudiantLogin';
import AdministrateurLogin from './LoginPages/AdministrationLogin';
import ProtectedRoute from './components/ProtectedRoute';
import { authService } from './services/api';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import StageManagement from './components/admin/StageManagement';
import DocumentManagement from './components/admin/DocumentManagement';
import StagiaireLayout from './components/stagiaire/StagiaireLayout';
import ProfilePage from './components/stagiaire/ProfilePage';
import StagePage from './components/stagiaire/StagePage';
import DocumentPage from './components/stagiaire/DocumentPage';
import FormateurDashboard from './components/FormateurDashboard';

function App() {
  // Check if user is authenticated
  const isAuthenticated = authService.isAuthenticated();
  const userType = authService.getUserType();
  
  // Determine the redirect path based on user type
  const getRedirectPath = () => {
    if (!isAuthenticated) return '/';
    
    switch(userType) {
      case 'administrateur':
        return '/admin/dashboard';
      case 'stagiaire':
        return '/etudiant/dashboard';
      case 'formateur':
        return '/formateur/dashboard';
      default:
        return '/';
    }
  };
  
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/formateur/login" element={<FormateurLogin />} />
        <Route path="/etudiant/login" element={<EtudiantLogin />} />
        <Route path="/admin/login" element={<AdministrateurLogin />} />
        
        {/* Redirect from old path to new path */}
        <Route path="/administrateur/login" element={<Navigate to="/admin/login" replace />} />
        
        {/* Protected routes for administrators */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute userType="administrateur">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute userType="administrateur">
            <UserManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/stages" element={
          <ProtectedRoute userType="administrateur">
            <StageManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/documents" element={
          <ProtectedRoute userType="administrateur">
            <DocumentManagement />
          </ProtectedRoute>
        } />
        
        {/* Protected routes for students */}
        <Route path="/etudiant" element={
          <ProtectedRoute userType="stagiaire">
            <StagiaireLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<ProfilePage />} />
          <Route path="stage" element={<StagePage />} />
          <Route path="documents" element={<DocumentPage />} />
        </Route>
        
        {/* Protected routes for instructors */}
        <Route path="/formateur/dashboard" element={
          <ProtectedRoute userType="formateur">
            <FormateurDashboard />
          </ProtectedRoute>
        } />
        
        {/* Redirect to appropriate dashboard if already logged in */}
        <Route path="*" element={<Navigate to={getRedirectPath()} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
