import { Link } from "react-router-dom";
import navBarImage from "../assets/image.png";

const Navbar = () => {
  return (
    <header className='bg-white shadow-2xl border-b border-amber-100 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4'>
        {/* Logo and Title */}
        <Link
          to='/'
          className='flex items-center gap-3 text-amber-800 hover:text-amber-600 transition duration-300'>
          <img
            src={navBarImage}
            alt='Support System'
            className='w-14 h-14 object-cover rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300'
          />
          <h1 className='text-2xl sm:text-3xl font-bold uppercase tracking-wide'>
            Admin Support System
          </h1>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className='flex flex-wrap items-center justify-center gap-3 sm:gap-4'>
            {[
              { path: "/request", label: "Request Form" },
              { path: "/feedback", label: "Feedback" },
              { path: "/status", label: "Check Status" },
              { path: "/login", label: "Login" },
            ].map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className='px-4 py-2 text-sm sm:text-base font-semibold text-amber-700 bg-white border border-amber-400 rounded-xl hover:bg-amber-200 hover:text-amber-800 transition duration-300 shadow-sm'>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
