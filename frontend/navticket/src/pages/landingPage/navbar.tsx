import { useState, useEffect } from 'react';
import { FaDownload, FaTimes, FaBars } from 'react-icons/fa';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import Button from '../../components/3dbutton';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setActive(window.location.pathname);
  }, []);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white fixed top-0 left-0 right-0 z-50 mb-6 ">
      <div className="flex items-center ml-20 ">
        <span
          className="ml-2 font-bold text-2xl tracking-tighter cursor-pointer"
          onClick={scrollToTop}
        >
          NavTicket
        </span>
      </div>
      <div className="flex items-center  ml-auto space-x-10  mr-20">
        <ul className={`list-none flex flex-row  ${toggle ? 'block' : 'hidden'} sm:flex`}>
          <li className={`${active === '/' ? 'text-cyan-600' : 'text-black' } hover:text-cyan-600 font-bold mr-12`}>
            <ScrollLink
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              onSetActive={() => setActive('/')}
            >
              Services
            </ScrollLink>
          </li>
          <li className={`${active === '/About' ? 'text-orange-400' : 'text-neutral-600'} hover:text-cyan-600 font-bold mr-12`}>
            <ScrollLink
              to="Contacts"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              onSetActive={() => setActive('/About')}
            >
              Contacts
            </ScrollLink>
          </li>
          <li className={`${active === '/pricing' ? 'text-orange-400' : 'text-neutral-600'} hover:text-cyan-600 font-bold mr-12`}>
            <ScrollLink
              to="Contacts"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              onSetActive={() => setActive('/About')}
            >
              Pricing
            </ScrollLink>
          </li>
         
        </ul>
        <ul className='flex items-center mr-4'>
            <li className='mr-4'>
                <button className='text-lg font-bold'
                 onClick={() => navigate('/login')}>
                    Login
                </button>
                
            </li>
            <li className='mr-4'>
              

                <Button/>
                    
            </li>
            <li>
            <button className="group h-8 select-none rounded-lg bg-blue-600 px-3 text-sm leading-8 text-zinc-50 shadow-[0_-1px_0_1px_#1e3a8a_inset,0_0_0_1px_#1d4ed8_inset,0_0.5px_0_1.5px_#60a5fa_inset] hover:bg-blue-700 active:bg-blue-800 active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.6)_inset]">
                <span className="block group-active:[transform:translate3d(0,1px,0)]">Transporteur</span>
            </button>
            </li>
        </ul >
        <div className="sm:hidden">
          <button
            className="text-gray-600 hover:text-cyan-600"
            onClick={handleToggle}
            aria-label="Toggle Menu"
          >
            {toggle ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
