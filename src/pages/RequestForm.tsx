import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFormData((prev) => ({ ...prev, attachment: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) form.append(key, value);
      });

      const response = await axios.post(
        "https://localhost:7096/api/Requests",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Success:", response.data);

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
      });

      setLoading(false);

      // Show success toast
      toast.success("Request submitted successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      setLoading(false);

      toast.error("Enter Valid Details", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Spinner />
      ) : (
        <div className='max-w-6xl mx-auto px-4 sm:px-8 py-12 bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.3)]'>
          <h2 className='text-4xl font-extrabold text-center bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text uppercase mb-12 tracking-wide'>
            Request Form
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Initiator Details */}
            <fieldset className='border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm bg-white/90'>
              <legend className='text-xl font-semibold text-teal-600 px-3'>
                Initiator Details
              </legend>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                {[
                  ["initiatorName", "Initiator Name", "text"],
                  ["mobileNo", "Mobile No", "tel"],
                  ["emailId", "Email Id", "email"],
                ].map(([name, label, type]) => (
                  <div key={name}>
                    <label className='block text-gray-700 font-medium mb-1'>
                      {label}
                    </label>
                    <input
                      name={name}
                      type={type}
                      value={(formData as any)[name]}
                      onChange={handleChange}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className='w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400'
                    />
                  </div>
                ))}
                <div>
                  <label className='block font-medium text-gray-700 mb-1'>
                    Department
                  </label>
                  <select
                    name='department'
                    value={formData.department}
                    onChange={handleChange}
                    className='w-full border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400'>
                    <option value=''>Select Department</option>
                    <option>IT</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Request Details */}
            <fieldset className='border border-gray-200 rounded-2xl p-6 shadow-sm bg-white/90'>
              <legend className='text-xl font-semibold text-teal-600 px-3'>
                Request Details
              </legend>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
                {[["requestDate", "Request Date", "date"]].map(
                  ([name, label, type]) => (
                    <div key={name}>
                      <label className='block text-gray-700 font-medium mb-1'>
                        {label}
                      </label>
                      <input
                        name={name}
                        type={type}
                        value={(formData as any)[name]}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400'
                      />
                    </div>
                  )
                )}

                {[
                  ["complaintType", "Complaint Type", ["Hardware", "Software"]],
                  ["location", "Location", ["HO", "Branch"]],
                  ["division", "Division", ["Operations", "IT"]],
                  ["priority", "Priority", ["High", "Medium", "Low"]],
                  ["assignedTo", "Assigned To", ["TBD", "To be entered"]],
                  [
                    "requestType",
                    "Request Type",
                    ["New Request", "Fix Existing"],
                  ],
                ].map(([name, label, options]) => (
                  <div key={name}>
                    <label className='block font-medium text-gray-700 mb-1'>
                      {label}
                    </label>
                    <select
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleChange}
                      className='w-full border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400'>
                      <option value=''>Select {label}</option>
                      {(options as string[]).map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className='mt-6'>
                <label className='block font-medium text-gray-700 mb-1'>
                  Request Remarks
                </label>
                <textarea
                  name='requestRemarks'
                  value={formData.requestRemarks}
                  onChange={handleChange}
                  rows={4}
                  placeholder='Describe your request in detail...'
                  className='w-full border border-gray-300 rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-teal-400'></textarea>
              </div>

              <div className='mt-6'>
                <label className='block font-medium text-gray-700 mb-1'>
                  Attachment
                </label>
                <input
                  type='file'
                  name='attachment'
                  onChange={handleFileChange}
                  className='file:border file:border-gray-300 file:rounded-xl file:px-4 file:py-2 file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200 transition'
                />
              </div>
            </fieldset>

            <div className='flex justify-end mt-10'>
              <button
                type='submit'
                className='bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold px-6 py-2 rounded-xl hover:brightness-110 transition-all shadow-md'>
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default RequestForm;
