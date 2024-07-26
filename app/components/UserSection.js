// UserSection.js
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import { AiOutlineLogout } from "react-icons/ai";
import ToolTip from './ToolTip';


const UserSection = ({ username }) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove('token'); // Remove the token from cookies
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-end pr-5 mb-5">
        <ToolTip tooltip='Logout'>
  
        <AiOutlineLogout size={32} color='#DC3545' onClick={handleLogout} />

        </ToolTip>
       
    </div>
  );
};

export default UserSection;
