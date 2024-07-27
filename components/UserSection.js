// UserSection.js
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import { AiOutlineLogout } from "react-icons/ai";
import ToolTip from './ToolTip';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


const UserSection = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const {username} = useSelector(state => state.user)

  const handleLogout = () => {
    Cookie.remove('token'); // Remove the token from cookies
    router.push('/login'); // Redirect to login page
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

  return (
    <div className={`fixed top-0 left-0 z-50 w-full mb-5 bg-white transition-shadow ${isScrolled ? 'shadow-lg' : ''}`}>
    <div className={`flex items-center justify-between p-4 pr-5 pl-5`}>

<h1 className="text-2xl lg:text-3xl font-extrabold mb-6 text-center lg:text-left text-gray-800">
          Task App
          <strong className="text-sm lg:text-md text-gray-700 ml-4 mb-6 text-center lg:text-left">
         by Abhishek Maurya
        </strong>
        </h1>

<div>
<div className='flex'>

        <h1 className="text-2xl font-bold text-gray-800 mr-4">Welcome {username}!</h1>
        <ToolTip tooltip='Logout'>
  
        <AiOutlineLogout size={32} color='#DC3545' onClick={handleLogout} />

        </ToolTip>
        </div>

        </div>
       
    </div>
    </div>
  );
};

export default UserSection;
