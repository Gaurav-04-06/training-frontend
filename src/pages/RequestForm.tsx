import React, { useState } from "react";
import axios from "axios";

interface FormData {
  initiatorName: string;
  department: string;
  mobileNo: string;
  emailId: string;
  requestDate: string;
  complaintType: string;
  location: string;
  division: string;
  priority: string;
  assignedTo: string;
  requestType: string;
  requestRemarks: string;
  attachment: File | null;
}

const RequestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    initiatorName: "",
    department: "",
    mobileNo: "",
    emailId: "",
    requestDate: "",
    complaintType: "",
    location: "",
    division: "",
    priority: "",
    assignedTo: "",
    requestType: "",
    requestRemarks: "",
    attachment: null,
  });

  // Handle text, select, date, textarea fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFormData((prev) => ({ ...prev, attachment: e.target.files![0] }));
    }
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          form.append(key, value);
        }
      });

      const response = await axios.post(
        "https://localhost:7096/api/Requests",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Success:", response.data);
      alert("Request submitted successfully!");
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className='max-w-6xl mx-auto p-6 sm:p-10 bg-white shadow-2xl rounded-2xl mt-12 mb-10'>
      <h2 className='text-4xl font-bold text-center text-amber-700 uppercase mb-10'>
        Request Form
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Initiator Details */}
        <fieldset className='border border-gray-200 rounded-xl p-6 mb-10 shadow-sm'>
          <legend className='text-lg font-semibold text-red-600 px-2'>
            Initiator Details
          </legend>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
            <div>
              <label className='block font-medium mb-1'>Initiator Name</label>
              <input
                type='text'
                name='initiatorName'
                value={formData.initiatorName}
                onChange={handleChange}
                placeholder='Enter name'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400'
              />
            </div>
            <div>
              <label className='block font-medium mb-1'>Department</label>
              <select
                name='department'
                value={formData.department}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400'>
                <option value=''>Select Department</option>
                <option>IT</option>
                <option>Admin</option>
              </select>
            </div>
            <div>
              <label className='block font-medium mb-1'>Mobile No</label>
              <input
                type='tel'
                name='mobileNo'
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder='Enter mobile'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400'
              />
            </div>
            <div>
              <label className='block font-medium mb-1'>Email Id</label>
              <input
                type='email'
                name='emailId'
                value={formData.emailId}
                onChange={handleChange}
                placeholder='Enter email'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400'
              />
            </div>
          </div>
        </fieldset>

        {/* Request Details */}
        <fieldset className='border border-gray-200 rounded-xl p-6 shadow-sm'>
          <legend className='text-lg font-semibold text-red-600 px-2'>
            Request Details
          </legend>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4'>
            <div>
              <label className='block font-medium mb-1'>Request Date</label>
              <input
                type='date'
                name='requestDate'
                value={formData.requestDate}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400'
              />
            </div>
            <div>
              <label className='block font-medium mb-1'>Complaint Type</label>
              <select
                name='complaintType'
                value={formData.complaintType}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400'>
                <option value=''>Select Type</option>
                <option>Hardware</option>
                <option>Software</option>
              </select>
            </div>
            <div>
              <label className='block font-medium mb-1'>Location</label>
              <select
                name='location'
                value={formData.location}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400'>
                <option value=''>Select Location</option>
                <option>HO</option>
                <option>Branch</option>
              </select>
            </div>
            <div>
              <label className='block font-medium mb-1'>Division</label>
              <select
                name='division'
                value={formData.division}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400'>
                <option value=''>Select Division</option>
                <option>Operations</option>
                <option>IT</option>
              </select>
            </div>
            <div>
              <label className='block font-medium mb-1'>Priority</label>
              <select
                name='priority'
                value={formData.priority}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400'>
                <option value=''>Select Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className='block font-medium mb-1'>Assigned To</label>
              <select
                name='assignedTo'
                value={formData.assignedTo}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400'>
                <option value=''>Select Staff</option>
                <option>TBD</option>
                <option>To be entered</option>
              </select>
            </div>
            <div>
              <label className='block font-medium mb-1'>Request Type</label>
              <select
                name='requestType'
                value={formData.requestType}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400'>
                <option value=''>Select Type</option>
                <option>New Request</option>
                <option>Fix Existing</option>
              </select>
            </div>
          </div>

          <div className='mt-6'>
            <label className='block font-medium mb-1'>Request Remarks</label>
            <textarea
              name='requestRemarks'
              value={formData.requestRemarks}
              onChange={handleChange}
              rows={4}
              placeholder='Type your request details here...'
              className='w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400'></textarea>
          </div>

          <div className='mt-6'>
            <label className='block font-medium mb-1'>Attachment</label>
            <input
              type='file'
              name='attachment'
              onChange={handleFileChange}
              className='file:border file:border-gray-300 file:rounded-md file:px-4 file:py-1 file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200'
            />
          </div>
        </fieldset>

        {/* Buttons */}
        <div className='flex justify-end gap-4 mt-10'>
          <button
            type='submit'
            className='bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-xl'>
            Save
          </button>
          <button
            type='button'
            onClick={() =>
              setFormData({
                initiatorName: "",
                department: "",
                mobileNo: "",
                emailId: "",
                requestDate: "",
                complaintType: "",
                location: "",
                division: "",
                priority: "",
                assignedTo: "",
                requestType: "",
                requestRemarks: "",
                attachment: null,
              })
            }
            className='bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-xl'>
            Refresh
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
