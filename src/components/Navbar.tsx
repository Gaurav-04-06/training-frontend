import { Link } from "react-router-dom";
import navBarImage from "../assets/image.png";

const Navbar = () => {
  return (
    <div className='bg-amber-100 py-4 px-6 shadow-md'>
      <div className='flex items-center justify-between flex-wrap'>
        <div className='flex items-center gap-4 mb-2 sm:mb-0'>
          <Link
            to='/'
            className='flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors duration-300 cursor-pointer'>
            <img
              src={navBarImage}
              alt='Support System'
              className='w-14 h-14 object-contain rounded-full  shadow-lg hover:shadow-xl transition-shadow duration-300'
            />
            <h1 className='text-2xl sm:text-4xl font-bold text-amber-900'>
              Admin Support System
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className='mt-3 sm:mt-0'>
          <ul className='flex gap-4 flex-wrap items-center'>
            <li>
              <Link
                to='/request'
                className='px-4 py-2 bg-white text-amber-700 border border-amber-400 rounded-full hover:bg-amber-200 transition duration-300 shadow-sm'>
                Request Form
              </Link>
            </li>
            <li>
              <Link
                to='/feedback'
                className='px-4 py-2 bg-white text-amber-700 border border-amber-400 rounded-full hover:bg-amber-200 transition duration-300 shadow-sm'>
                Feedback
              </Link>
            </li>
            <li>
              <Link
                to='/status'
                className='px-4 py-2 bg-white text-amber-700 border border-amber-400 rounded-full hover:bg-amber-200 transition duration-300 shadow-sm'>
                Check Status
              </Link>
            </li>
            <li>
              <Link
                to='/login'
                className='px-4 py-2 bg-white text-amber-700 border border-amber-400 rounded-full hover:bg-amber-200 transition duration-300 shadow-sm'>
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
