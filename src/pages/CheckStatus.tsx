import React, { useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import Spinner from "../components/Spinner";

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
  const [loading, setLoading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleSearch = async () => {
    if (!requestId.trim()) {
      setError("Please enter a valid Request ID.");
      setRequestData(null);
      return;
    }

    setLoading(true);

    try {
      const resp = await axios.get<RequestData>(
        `https://localhost:7096/api/Requests/${requestId}`
      );
      setRequestData(resp.data);
      setError("");
    } catch (err: any) {
      console.error(err);
      setRequestData(null);
      if (err.response?.status === 404) {
        setError("No record found for that Request ID.");
      } else {
        setError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Outside render return
  const handlePrint = useReactToPrint({
    content: () => {
      if (printRef.current === null) {
        alert("Nothing to print");
        return null;
      }
      return printRef.current;
    },
    documentTitle: `Request_${requestId}`,
  });

  return (
    <div className='max-w-6xl mx-auto px-6 py-10 bg-white/80 backdrop-blur-lg rounded-3xl shadow-[0_10px_60px_-10px_rgba(0,0,0,0.3)] mt-14 mb-12 print:shadow-none print:bg-white print:rounded-none print:mt-0 print:mb-0'>
      <h2 className='text-5xl font-extrabold text-center bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text mb-12 uppercase tracking-wide print:text-black print:bg-none print:mb-6 print:text-3xl'>
        Check Status
      </h2>

      <div className='flex flex-col sm:flex-row items-center gap-4 mb-8 print:hidden'>
        <label className='text-lg font-medium w-full sm:w-auto text-gray-700'>
          Enter Request / Complaint No:
        </label>
        <input
          type='text'
          placeholder='e.g. 123456'
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
          className='border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none px-4 py-2 rounded-xl w-full sm:w-64 shadow-sm bg-white'
        />
        <button
          onClick={handleSearch}
          className='bg-gradient-to-r from-teal-500 to-blue-500 hover:brightness-110 transition text-white font-semibold px-6 py-2 rounded-xl shadow-lg'>
          Show
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : !requestData ? (
        <p className='text-blue-600 font-medium mb-6'>{error}</p>
      ) : (
        <div ref={printRef}
          className='text-gray-800 print:text-black print:bg-white print:p-6 print:rounded-none print:shadow-none print:text-sm print:max-w-full'>
          {/* Personal Details */}
          <fieldset className='border-l-4 border-teal-500 bg-white rounded-xl p-6 mb-10 shadow-md print:shadow-none print:border-l-2 print:mb-6 print:break-inside-avoid'>
            <legend className='text-xl font-semibold text-teal-600 px-2 print:text-black print:font-bold'>
              Personal Details
            </legend>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
              <input
                className='bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg print:bg-white'
                value={requestData.initiatorName}
                disabled
              />
              <input
                className='bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg print:bg-white'
                value={requestData.department}
                disabled
              />
              <input
                className='bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg print:bg-white'
                value={requestData.mobileNo}
                disabled
              />
              <input
                className='bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg print:bg-white'
                value={requestData.emailId}
                disabled
              />
            </div>
          </fieldset>

          {/* Issue Details */}
          <fieldset className='border-l-4 border-blue-500 bg-white rounded-xl p-6 mb-10 shadow-md print:shadow-none print:border-l-2 print:mb-6 print:break-inside-avoid'>
            <legend className='text-xl font-semibold text-blue-600 px-2 print:text-black print:font-bold'>
              Issue Details
            </legend>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4'>
              <input
                className='bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg print:bg-white'
                value={requestData.id}
                disabled
              />
              <input
                className='bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg print:bg-white'
                value={requestData.location}
                disabled
              />
              <input
                className='bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg print:bg-white'
                value={requestData.division}
                disabled
              />
              <input
                className='bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg print:bg-white'
                value={requestData.requestType}
                disabled
              />
              <input
                className='bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg print:bg-white'
                value={requestData.priority}
                disabled
              />
              <input
                className='bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg print:bg-white'
                value={new Date(requestData.requestDate).toLocaleDateString()}
                disabled
              />
              <input
                className='bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg print:bg-white'
                value={requestData.assignedTo}
                disabled
              />
            </div>

            <div className='mt-6'>
              <label className='block font-medium mb-1 text-gray-700 print:text-black'>
                Remarks
              </label>
              <textarea
                rows={3}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 resize-none bg-gray-100 print:bg-white'
                value={requestData.requestRemarks}
                disabled
              />
            </div>
          </fieldset>

          {/* Previous Remarks */}
          <div className='bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6 shadow-inner print:bg-white print:border print:shadow-none print:break-inside-avoid'>
            <label className='block font-medium mb-2 text-blue-700 print:text-black'>
              Previous Remarks
            </label>
            <textarea
              className='w-full border border-gray-300 rounded-lg px-4 py-2 resize-none bg-gray-100 text-gray-700 print:bg-white'
              rows={4}
              disabled
              value={requestData.requestRemarks}
            />
            <button className='mt-4 px-4 py-2 rounded-lg bg-blue-200 text-blue-900 hover:bg-blue-300 transition print:hidden'>
              Add Remark
            </button>
          </div>

          {/* Attachment */}
          {requestData.attachmentPath && (
            <div className='flex items-center gap-4 mb-8 print:hidden'>
              <label className='font-medium text-gray-700'>
                Download Attachment:
              </label>
              <a
                href={`https://localhost:7096/${requestData.attachmentPath}`}
                target='_blank'
                download
                className='px-4 py-2 rounded-lg bg-sky-100 text-sky-800 hover:bg-sky-200 transition'>
                Download
              </a>
            </div>
          )}

          {/* Download PDF */}
          <button
            onClick={handlePrint}
            className='mt-4 px-6 py-2 rounded-xl bg-emerald-200 text-emerald-900 hover:bg-emerald-300 shadow transition-all print:hidden'>
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckStatus;
