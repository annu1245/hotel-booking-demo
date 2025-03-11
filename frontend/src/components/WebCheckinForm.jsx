import React, { useState } from 'react';
import axiosInstance from './../middleware/axiosClient';

const WebCheckinForm = () => {
  const [aadhaarNumbers, setAadhaarNumbers] = useState('');
  const [aadhaarValidations, setAadhaarValidations] = useState({});

  const handleCheckAadhaar = async (aadhaarNumber) => {
    try {
      const response = await axiosInstance.post('/api/aadhaar/check', { aadhaarNumber });
      setAadhaarValidations({ ...aadhaarValidations, [aadhaarNumber]: response.data });
    } catch (error) {
      setAadhaarValidations({ ...aadhaarValidations, [aadhaarNumber]: { valid: false, error: 'Check failed' } });
      console.error('Aadhaar check error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... (existing submit logic)
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Web Check-in</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Aadhaar Numbers (comma-separated)"
          value={aadhaarNumbers}
          onChange={(e) => setAadhaarNumbers(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
        <div>
          {aadhaarNumbers.split(',').map((aadhaar) => (
            <div key={aadhaar} className="flex items-center mb-2">
              <button
                type="button"
                onClick={() => handleCheckAadhaar(aadhaar.trim())}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
              >
                Check {aadhaar.trim()}
              </button>
              {aadhaarValidations[aadhaar.trim()] && (
                <p className="m-0">
                  {aadhaarValidations[aadhaar.trim()].valid
                    ? 'Valid'
                    : aadhaarValidations[aadhaar.trim()].error || 'Invalid'}
                </p>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Check-in
        </button>
      </form>
    </div>
  );
};

export default WebCheckinForm;