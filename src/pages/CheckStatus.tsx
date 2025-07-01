import React, { useState } from "react";
import axios from "axios";

interface RequestData {
  id: number;
  initiatorName: string;
  department: string;
  mobileNo: string;
  emailId: string;
  complaintType: string;
  location: string;
  division: string;
  requestType: string;
  priority: string;
  requestDate: string;
  assignedTo: string;
  requestRemarks: string;
  attachmentPath: string;
}

const CheckStatus: React.FC = () => {
  const [requestId, setRequestId] = useState<string>("");
  const [requestData, setRequestData] = useState<RequestData | null>(null);
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    if (!requestId.trim()) {
      setError("Please enter a valid Request ID.");
      setRequestData(null);
      return;
    }

    try {
      const resp = await axios.get<RequestData>(
        `https://localhost:7096/api/Requests/${requestId}`
      );
      setRequestData(resp.data);
      setError("");
    } catch (err: unknown) {
      console.error(err);
      setRequestData(null);
      if (err.response?.status === 404) {
        setError("No record found for that Request ID.");
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className='max-w-6xl mx-auto p-6 sm:p-10 bg-white shadow-2xl rounded-2xl mt-12 mb-10'>
      <h2 className='text-4xl font-bold text-center text-red-700 uppercase mb-10'>
        Check Status
      </h2>

      <div className='flex flex-col sm:flex-row items-center gap-4 mb-4'>
        <label className='text-lg font-semibold w-full sm:w-auto'>
          Enter Request / Complaint No:
        </label>
        <input
          type='text'
          placeholder='e.g. 123456'
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
          className='border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-64'
        />
        <button
          onClick={handleSearch}
          className='bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg'>
          Show
        </button>
      </div>

      {error && <p className='text-red-600 font-medium mb-6'>{error}</p>}

      {requestData && (
        <>
          {/* Personal Details */}
          <fieldset className='border border-gray-300 rounded-xl p-6 mb-8 shadow-sm'>
            <legend className='text-lg font-semibold text-red-600 px-2'>
              Personal Details
            </legend>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
              <input
                className='border border-gray-300 px-4 py-2 rounded-lg'
                value={requestData.initiatorName}
                disabled
              />
              <input
                className='border border-gray-300 px-4 py-2 rounded-lg'
                value={requestData.department}
                disabled
              />
              <input
                className='border border-gray-300 px-4 py-2 rounded-lg'
                value={requestData.mobileNo}
                disabled
              />
              <input
                className='border border-gray-300 px-4 py-2 rounded-lg'
                value={requestData.emailId}
                disabled
              />
            </div>
          </fieldset>

          {/* Issue Details */}
          <fieldset className='border border-gray-300 rounded-xl p-6 mb-8 shadow-sm'>
            <legend className='text-lg font-semibold text-red-600 px-2'>
              Issue Details
            </legend>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4'>
              <input
                className='border border-gray-300 px-4 py-2 rounded-lg'
                value={requestData.id}
                disabled
                placeholder='Request No'
              />
              <input
                className='border border-gray-300 px-4 py-2 rounded-lg'
                value={requestData.location}
                disabled
                placeholder='Location'
              />
              <input
                className='border border-gray-300 px-4 py-2 rounded-lg'
                value={requestData.division}
                disabled
                placeholder='Division'
              />
              <input
                className='border border-gray-300 px-4 py-2 rounded-lg'
                value={requestData.requestType}
                disabled
                placeholder='Request Type'
              />
              <input
                className='border border-gray-300 px-4 py-2 rounded-lg'
                value={requestData.priority}
                disabled
                placeholder='Priority'
              />
              <input
                className='border border-gray-300 px-4 py-2 rounded-lg'
                value={new Date(requestData.requestDate).toLocaleDateString()}
                disabled
                placeholder='Complaint Date'
              />
              <input
                className='border border-gray-300 px-4 py-2 rounded-lg'
                value={requestData.assignedTo}
                disabled
                placeholder='Assigned To'
              />
            </div>

            <div className='mt-6'>
              <label className='block font-medium mb-1'>Remarks</label>
              <textarea
                rows={3}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 resize-none bg-gray-100'
                value={requestData.requestRemarks}
                disabled
              />
            </div>
          </fieldset>

          {/* Previous Remarks / Add Remark */}
          <div className='border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50 shadow-inner'>
            <label className='block font-medium mb-2'>Previous Remarks</label>
            <textarea
              className='w-full border border-gray-300 rounded-lg px-4 py-2 resize-none bg-gray-100 text-gray-700'
              rows={4}
              disabled
              value={requestData.requestRemarks}
            />
            <button className='mt-4 px-4 py-2 rounded-lg bg-amber-200 text-amber-800 hover:bg-amber-300'>
              Add Remark
            </button>
          </div>

          {/* Download Attachment */}
          {requestData.attachmentPath && (
            <div className='flex items-center gap-4 mb-6'>
              <label className='font-medium'>Download Attachment:</label>
              <a
                href={`https://localhost:7096/${requestData.attachmentPath}`}
                target='_blank'
                download
                className='px-4 py-2 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200'>
                Download
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CheckStatus;
