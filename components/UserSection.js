import { useRouter } from 'next/navigation';
import { AiOutlineLogout } from "react-icons/ai";
import ToolTip from './ToolTip';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserSection = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // State to toggle menu
  const { username } = useSelector(state => state.user);

  const handleLogout = async () => {
    const res = await axios.post('/api/logout');
    
    if (res.status === 200) {
      router.push('/login'); // Redirect to login page
    } else {
      // Handle error
      console.error('Logout failed');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleUserClick = () => {
    setShowMenu(!showMenu); // Toggle menu visibility
  };

  return (
    <div className={`fixed top-0 left-0 z-50 w-full bg-white transition-shadow ${isScrolled ? 'shadow-2xl' : ''}`}>
      <div className={`flex flex-row items-center justify-between p-2 pr-5 pl-5`}>
        <div className="flex flex-col lg:flex-row items-center">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-center lg:text-left text-gray-800">
            Task App
          </h1>
          <strong className="text-sm lg:text-md text-gray-700 mt-2 lg:mt-0 lg:ml-4">
            by Abhishek Maurya
          </strong>
        </div>

        <div className="flex items-center mt-2 lg:mt-0">
          {/* User circle and dropdown menu for mobile */}
          <div className="relative lg:hidden">
            <div 
              className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center cursor-pointer"
              onClick={handleUserClick}
            >
              <span className="text-lg font-bold">{username[0]}</span> {/* Display first letter of username */}
            </div>
            {showMenu && (
              <div className="absolute top-12 right-0 bg-white border border-gray-300 shadow-lg p-4 rounded">
                <h2 className="text-gray-800 mb-2">Welcome {username}!</h2>
                <ToolTip tooltip='Logout'>
                  <div className="flex items-center cursor-pointer" onClick={handleLogout}>
                    <AiOutlineLogout size={20} color='#DC3545' />
                    <span className="ml-2 text-red-500">Logout</span>
                  </div>
                </ToolTip>
              </div>
            )}
          </div>

          {/* Desktop view */}
          <div className="hidden lg:flex items-center">
            <h1 className="text-lg lg:text-2xl font-bold text-gray-800 mr-2 lg:mr-4">
              Welcome {username}!
            </h1>
            <ToolTip tooltip='Logout'>
              <AiOutlineLogout size={24} color='#DC3545' onClick={handleLogout} />
            </ToolTip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSection;
