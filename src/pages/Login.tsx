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
      className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto mt-20'>
      <h2 className='text-3xl font-bold text-center mb-4 text-amber-700'>
        Login
      </h2>

      <label className='block mb-2'>Department</label>
      <select className='w-full border px-3 py-2 mb-4 rounded' required>
        <option value=''>Select Department</option>
        <option value='Admin'>Admin Support System</option>
        <option value='IT'>IT Help Desk</option>
      </select>

      <label className='block mb-2'>Username</label>
      <input
        className='w-full border px-3 py-2 mb-4 rounded'
        type='text'
        required
      />

      <label className='block mb-2'>Password</label>
      <input
        className='w-full border px-3 py-2 mb-4 rounded'
        type='password'
        required
      />

      <TextCaptcha onVerify={setCaptchaVerified} />

      <button
        type='submit'
        className='w-full mt-4 bg-amber-500 text-white py-2 rounded hover:bg-amber-600'>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
