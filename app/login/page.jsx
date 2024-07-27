import {
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiRedux,
  SiTailwindcss,
  SiExpress,
} from 'react-icons/si';

import LoginForm from '@components/LoginForm'
import WithRedux from '@/utils/WithRedux';

const TechIcon = ({ icon: Icon, label }) => (
  <div className="flex items-center space-x-4 p-4">
    <Icon className="text-4xl lg:text-5xl text-gray-600" />
    <span className="text-lg lg:text-xl font-semibold">{label}</span>
  </div>
);



const Login = () => {




  const techStack = [
    { icon: SiNextdotjs, label: 'Next.js' },
    { icon: SiNodedotjs, label: 'Node.js' },
    { icon: SiMongodb, label: 'MongoDB' },
    { icon: SiRedux, label: 'Redux' },
    { icon: SiTailwindcss, label: 'Tailwind CSS' },
    { icon: SiExpress, label: 'Express' },
    { icon: SiNextdotjs, label: 'Next.js' },
    { icon: SiNodedotjs, label: 'Node.js' },
    { icon: SiMongodb, label: 'MongoDB' },
    { icon: SiRedux, label: 'Redux' },
    { icon: SiTailwindcss, label: 'Tailwind CSS' },
    { icon: SiExpress, label: 'Express' }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-purple-200 to-blue-200">
      {/* Left Side - Platform Details */}
      <div className="lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center items-center lg:items-start">
        <h1 className="text-3xl lg:text-4xl font-extrabold mb-6 text-center lg:text-left text-gray-800">
          Task Management App
          <strong className="text-base lg:text-lg text-gray-700 ml-4 mb-6 text-center lg:text-left">
         by Abhishek Maurya
        </strong>
        </h1>
      

        <h3 className="text-xl lg:text-2xl font-bold mb-6 text-center lg:text-left text-gray-800">
          Tech Stack Used
        </h3>
        <div className="overflow-hidden w-full">
          <div className="flex animate-scroll">
            {techStack.map((tech, index) => (
              <TechIcon key={index} icon={tech.icon} label={tech.label} />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
