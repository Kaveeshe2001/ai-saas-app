import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { ArrowRight } from 'lucide-react';
import PrimaryButton from '../ui/Buttons/PrimaryButton/PrimaryButton';
import { useAuth } from '../../context/useAuth';
import { RiUserFill } from '@remixicon/react';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, isLoggedIn } = useAuth();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  }

  return (
    <div className="fixed w-full z-5 backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <img src={assets.logo} alt='logo' className='w-32 sm:w-44 cursor-pointer' onClick={() => navigate('/')} />

      {isLoggedIn() ? (
        <>
          <a href='/dashboard' 
            className='group relative z-10 hidden overflow-hidden whitespace-nowrap rounded-[5px] border-solid 
            border-primary-color bg-primary-color2 px-[19px] py-3 text-base font-normal 
            leading-none text-white transition-all duration-500 lg:flex 
            items-center gap-x-[5px] border-t border-l border-b-4 border-r-4'>
            <RiUserFill size={15} color='#fff' />
            My Account
            <span className='absolute left-[84.2344px] top-[40.5px] -z-10 block h-0 w-0 -translate-x-1/2 
            -translate-y-1/2 rounded-full bg-primary-color transition-all 
            duration-500 group-hover:h-[1000px] group-hover:w-[225%]'></span>
          </a>
          <PrimaryButton
            text='logout'
            variant='default'
            onClick={handleLogout}
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
