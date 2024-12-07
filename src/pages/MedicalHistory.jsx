import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PatientSearch from '../components/MedicalHistory/PatientSearch';
import PatientHistoryList from '../components/MedicalHistory/PatientHistoryList';
import { getMedicalHistory, getPatientMedicalHistory } from '../services/medicalHistoryService';

function MedicalHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = selectedPatient
          ? await getPatientMedicalHistory(selectedPatient._id)
          : await getMedicalHistory();
        setMedicalHistory(data);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load medical history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicalHistory();
  }, [selectedPatient]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    // In a real application, this would trigger an API call to search patients
    // For now, we'll just simulate selecting a patient
    if (query) {
      setSelectedPatient({
        _id: '12345',
        name: query
      });
    } else {
      setSelectedPatient(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Medical History</h1>
        {selectedPatient && (
          <button
            onClick={() => {
              setSelectedPatient(null);
              setSearchQuery('');
            }}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
          >
            View All Patients
          </button>
        )}
      </div>

      <PatientSearch
        onSearch={handleSearch}
        selectedPatient={selectedPatient}
        isLoading={isLoading}
      />

      <PatientHistoryList
        history={medicalHistory}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default MedicalHistory;