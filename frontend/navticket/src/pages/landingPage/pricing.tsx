import { useNavigate } from "react-router-dom";

function Pricing() {

  const navigate = useNavigate()
    return (
      <div className="w-full h-auto bg-white px-4 sm:px-6 lg:px-8 mt-10">
        <div className="w-full max-w-6xl mx-auto">
          <div className="mt-10">
            <h2 className="text-3xl font-bold text-center mb-8">Package</h2>
          </div>
  
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Basic Plan */}
            <div className="bg-sky-50 rounded-lg shadow-md p-5 flex flex-col flex-1 mx-6 transition duration-300 hover:border-2 hover:border-blue-600"
            id='basic'>
              <h3 className="text-lg font-semibold mb-3">Basic</h3>
              <p className="text-gray-600 mb-3">Plan de base</p>
              <p className="text-3xl font-bold mb-5">
                250.000 XOF
                <span className="text-lg font-normal text-gray-600">/month</span>
              </p>
              <ul className="mb-5 flex-grow">
                <li className="flex items-center mb-2">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Vente de ticket
                </li>
                <li className="flex items-center mb-2">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Assistance de base
                </li>
              </ul>
              <button className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-300"
              onClick={() => navigate('/auth')}>
                Choisir Plan
              </button>
            </div>
  
            {/* Pro Plan */}
            <div className="bg-sky-50 rounded-lg shadow-md p-5 flex flex-col flex-1 mx-6 transition duration-300 hover:border-2 hover:border-blue-600"
            id='pro'>
              <h3 className="text-lg font-semibold mb-3">Pro</h3>
              <p className="text-gray-600 mb-3">Support Business</p>
              <p className="text-3xl font-bold mb-5">
                500.000 XOF
                <span className="text-lg font-normal text-gray-600">/month</span>
              </p>
              <ul className="mb-5 flex-grow">
                <li className="flex items-center mb-2">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Vente de tickets
                </li>
                <li className="flex items-center mb-2">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Gestion d'expeditions Colis
                </li>
                <li className="flex items-center mb-2">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Dashboard management
                </li>
                <li className="flex items-center mb-2">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Outils Analytics avancées
                </li>
              </ul>
              <button className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-300"
              onClick={() => navigate('/auth')}>
                Choisir Plan
              </button>
            </div>
  
            {/* Elite Plan */}
            <div className="bg-sky-50 rounded-lg shadow-md p-5 flex flex-col flex-1 mx-6 transition duration-300 hover:border-2 hover:border-blue-600"
            id='elite'>
              <h3 className="text-lg font-semibold mb-3">Elite</h3>
              <p className="text-gray-600 mb-3">Pour Operations & </p>
              <p className="text-3xl font-bold mb-5">
                1000.000 XOF
                <span className="text-lg font-normal text-gray-600">/month</span>
              </p>
              <ul className="mb-5 flex-grow">
                <li className="flex items-center mb-2">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Ventes de tickets
                </li>
                <li className="flex items-center mb-2">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Gestion d'expedition de colis & Dashboard
                </li>
                <li className="flex items-center mb-2">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  24/7 Support dédié & Outils avancés
                </li>
                <li className="flex items-center mb-2">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Solutions personnalisées
                </li>
              </ul>
              <button className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-300">
                Contact
              </button>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
  
  export default Pricing;
  