import React, { useEffect, useState } from "react";
import { IoReloadSharp } from "react-icons/io5";

interface TextCaptchaProps {
  onVerify: (isVerified: boolean) => void;
}

const generateCaptcha = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 4 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
};

const TextCaptcha: React.FC<TextCaptchaProps> = ({ onVerify }) => {
  const [captcha, setCaptcha] = useState<string>("");
  const [input, setInput] = useState<string>("");

  // Generate captcha on mount
  useEffect(() => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
  }, []);

  // Validate input on change
  useEffect(() => {
    onVerify(input === captcha);
  }, [input, captcha, onVerify]);

  const handleReload = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    setInput("");
    onVerify(false);
  };

  return (
    <div className='my-4'>
      <div className='flex gap-3 items-center'>
        <p className='mb-1 mr-0 font-semibold'>Captcha</p>

        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='border border-gray-400 px-1 py-2 rounded focus:outline-none'
          placeholder='Enter here'
        />

        <div className='text-xl font-bold bg-gray-100 px-4 py-2 rounded select-none'>
          {captcha}
        </div>

        <button
          type='button'
          onClick={handleReload}
          title='Reload Captcha'
          className='bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition duration-200'>
          <IoReloadSharp size={20} />
        </button>
      </div>
    </div>
  );
};

export default TextCaptcha;
