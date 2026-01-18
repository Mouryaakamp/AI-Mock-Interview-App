import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const path = location.pathname;

  const getUserEmail = () => {
    return localStorage.getItem('userEmail') || 'User';
  };

  return (
    <div className='flex p-4 md:p-6 items-center justify-between bg-white border-b-2 border-gray-200 shadow-sm sticky top-0 z-50'>
      <Link to="/dashboard" className='flex items-center gap-2'>
        <img src="/logo.svg" width={120} height={50} alt='logo' className='object-contain' />
      </Link>
      <ul className='hidden md:flex gap-8 items-center'>
        <li>
          <Link
            to="/dashboard"
            className={`px-3 py-2 rounded-lg transition-all cursor-pointer font-medium ${
              path === "/dashboard" 
                ? "text-blue-600 bg-blue-50 font-semibold" 
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/Questions"
            className={`px-3 py-2 rounded-lg transition-all cursor-pointer font-medium ${
              path === "/dashboard/Questions" 
                ? "text-blue-600 bg-blue-50 font-semibold" 
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            Questions
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/How"
            className={`px-3 py-2 rounded-lg transition-all cursor-pointer font-medium ${
              path === "/dashboard/How" 
                ? "text-blue-600 bg-blue-50 font-semibold" 
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            How it works
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/Upgrade"
            className={`px-3 py-2 rounded-lg transition-all cursor-pointer font-medium ${
              path === "/dashboard/Upgrade" 
                ? "text-blue-600 bg-blue-50 font-semibold" 
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            Upgrade
          </Link>
        </li>
      </ul>
      <div className="flex items-center gap-3">
        <div className="hidden md:block text-sm text-gray-600">
          {getUserEmail().split('@')[0]}
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
          {getUserEmail().charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default Header;
