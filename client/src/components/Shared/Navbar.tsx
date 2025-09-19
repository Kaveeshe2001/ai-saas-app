import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { ArrowRight } from 'lucide-react';
import PrimaryButton from '../ui/Buttons/PrimaryButton/PrimaryButton';
import { useAuth } from '../../context/useAuth';
import { RiUserFill } from '@remixicon/react';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="fixed w-full z-5 backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <img src={assets.logo} alt='logo' className='w-32 sm:w-44 cursor-pointer' onClick={() => navigate('/')} />

      {isLoggedIn() ? (
        <>
          <PrimaryButton
            text='My Account'
            variant='default'
            icon={<RiUserFill />}
            link='/dashboard'
          />
        </>
      ) : (
        <>
          <PrimaryButton 
            text='Get started'
            icon={<ArrowRight />}  
            variant='white' 
            link='/signup' 
          />
        </>
      )}
    </div>
  );
};

export default Navbar;
