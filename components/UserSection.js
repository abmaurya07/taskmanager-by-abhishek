// UserSection.js
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import { AiOutlineLogout } from "react-icons/ai";
import ToolTip from './ToolTip';
import { useSelector } from 'react-redux';


const UserSection = ({ username }) => {
  const router = useRouter();
  const {username} = useSelector(state => state.user)

  const handleLogout = () => {
    Cookie.remove('token'); // Remove the token from cookies
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-end pr-5 mb-5">

        <h1 className="text-2xl font-bold text-gray-800 mr-4">Welcome {username}!</h1>
        <ToolTip tooltip='Logout'>
  
        <AiOutlineLogout size={32} color='#DC3545' onClick={handleLogout} />

        </ToolTip>
       
    </div>
  );
};

export default UserSection;
