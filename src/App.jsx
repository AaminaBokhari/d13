import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import Prescriptions from './pages/Prescriptions';
import MedicalHistory from './pages/MedicalHistory';
import Chat from './pages/Chat';
import SymptomChecker from './pages/SymptomChecker';
import Sidebar from './components/Layout/Sidebar';
import { checkBackendHealth, testMongoConnection } from './utils/backendHealth';
import './App.css';

function App() {
  useEffect(() => {
    const checkHealth = async () => {
      const isServerHealthy = await checkBackendHealth();
      if (isServerHealthy) {
        await testMongoConnection();
      }
    };

    checkHealth();
  }, []);

  const isAuthenticated = !!localStorage.getItem('doctor_token');

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {isAuthenticated && <Sidebar />}
        <main className={`flex-1 overflow-y-auto p-6 ${!isAuthenticated ? 'w-full' : ''}`}>
          <Routes>
            <Route 
              path="/register" 
              element={!isAuthenticated ? <Register /> : <Navigate to="/" />} 
            />
            <Route
              path="/"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/register" />}
            />
            <Route
              path="/appointments"
              element={isAuthenticated ? <Appointments /> : <Navigate to="/register" />}
            />
            <Route
              path="/prescriptions"
              element={isAuthenticated ? <Prescriptions /> : <Navigate to="/register" />}
            />
            <Route
              path="/medical-history"
              element={isAuthenticated ? <MedicalHistory /> : <Navigate to="/register" />}
            />
            <Route
              path="/chat"
              element={isAuthenticated ? <Chat /> : <Navigate to="/register" />}
            />
            <Route
              path="/symptom-checker"
              element={isAuthenticated ? <SymptomChecker /> : <Navigate to="/register" />}
            />
          </Routes>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;