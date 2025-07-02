import React, { useState } from "react";
import TextCaptcha from "../components/TextCaptcha";

const LoginForm: React.FC = () => {
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("❌ Please complete the CAPTCHA correctly");
      return;
    }

    console.log("Data submitted successfully");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white/80 backdrop-blur-lg shadow-[0_10px_60px_-10px_rgba(0,0,0,0.3)] px-8 py-10 rounded-3xl w-full max-w-md mx-auto mt-24'>
      <h2 className='text-4xl font-extrabold text-center bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text mb-8 uppercase tracking-wider'>
        Login
      </h2>

      <div className='mb-6'>
        <label className='block mb-2 font-medium text-gray-700'>
          Department
        </label>
        <select
          className='w-full border border-gray-300 px-4 py-2 rounded-xl bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none'
          required>
          <option value=''>Select Department</option>
          <option value='Admin'>Admin Support System</option>
          <option value='IT'>IT Help Desk</option>
        </select>
      </div>

      <div className='mb-6'>
        <label className='block mb-2 font-medium text-gray-700'>Username</label>
        <input
          className='w-full border border-gray-300 px-4 py-2 rounded-xl bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none'
          type='text'
          placeholder='Enter your username'
          required
        />
      </div>

      <div className='mb-6'>
        <label className='block mb-2 font-medium text-gray-700'>Password</label>
        <input
          className='w-full border border-gray-300 px-4 py-2 rounded-xl bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none'
          type='password'
          placeholder='Enter your password'
          required
        />
      </div>

      <TextCaptcha onVerify={setCaptchaVerified} />

      <button
        type='submit'
        className='w-full mt-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white py-2.5 rounded-xl font-semibold hover:brightness-110 transition-all shadow-md'>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
