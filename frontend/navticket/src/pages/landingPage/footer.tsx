import { MdEmail } from 'react-icons/md';

function Footer () {

    return (
        <div className="w-full h-80 bg-sky-950 flex flex-col items-center justify-center text-white">
          <div className="flex flex-col items-center">
            <MdEmail className="text-6xl mb-4" /> {/* Email icon */}
            <p className="text-center mb-2">navticket@info.com</p>
            <p className="text-center">Ecrivez nous pour toute préoccupation</p>
          </div>
        </div>
      );

}

export default Footer