import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

function PatientSearch({ onSearch, selectedPatient, isLoading }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search patient by name or ID..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          />
        </div>
        
        {selectedPatient && (
          <div className="flex items-center space-x-3 px-4 py-2 bg-blue-50 rounded-lg">
            <FaUserCircle className="text-blue-500 text-xl" />
            <div>
              <p className="font-medium text-blue-900">{selectedPatient.name}</p>
              <p className="text-sm text-blue-600">ID: {selectedPatient._id}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

PatientSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  selectedPatient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  isLoading: PropTypes.bool
};

export default PatientSearch;