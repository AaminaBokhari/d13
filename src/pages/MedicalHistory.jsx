import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useMedicalHistory } from '../hooks/useMedicalHistory';
import PatientSearch from '../components/MedicalHistory/PatientSearch';
import PatientHistoryList from '../components/MedicalHistory/PatientHistoryList';
import RecordForm from '../components/MedicalHistory/RecordForm';

function MedicalHistory() {
  const { user } = useAuth();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { medicalHistory, isLoading, error, createRecord } = useMedicalHistory(
    selectedPatient?._id
  );

  const handleSearch = async (query) => {
    // In a real app, this would be an API call
    if (query) {
      setSelectedPatient({
        _id: '12345',
        name: query
      });
    } else {
      setSelectedPatient(null);
    }
  };

  const handleCreateRecord = (data) => {
    if (!selectedPatient) return;
    
    createRecord({
      ...data,
      patient: selectedPatient._id,
      doctor: user.id,
      date: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Medical History</h1>
        {selectedPatient && (
          <button
            onClick={() => setSelectedPatient(null)}
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

      {selectedPatient && user.role === 'doctor' && (
        <RecordForm onSubmit={handleCreateRecord} isLoading={isLoading} />
      )}

      <PatientHistoryList
        history={medicalHistory}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default MedicalHistory;