import Cadenas from '../../assets/cadenas.png';
import Horloge from '../../assets/horloge-3d.png';
import Eticket from '../../assets/eticket.png';
import Dash from '../../assets/dash.png'
import Pay from '../../assets/pay.png'

function About() {
  const elements = {
    card1: {
      title: 'Sécurité',
      description: 'Protégez vos voyages avec des e-billets vérifiés et des informations de passagers enregistrées.',
      icon: Cadenas,
    },
    card2: {
      title: 'Gain de Temps',
      description: 'Réservez en ligne et évitez les files d\'attente pour un embarquement plus rapide.',
      icon: Horloge,
    },
    card3: {
      title: 'Confort',
      description: 'Planifiez votre trajet à l\'avance et voyagez l\'esprit tranquille.',
      icon: Eticket,
    },
  };

  const elements_2 = {
    card1: {
      title: 'Réservation de Tickets',
      description: 'Réservez vos billets de bus facilement depuis votre ordinateur ou smartphone.',
      icon: Eticket,
      
    },
    card2: {
      title: 'Gestion Simplifiée',
      description: 'Optimisez la gestion des trajets, réservations et paiements grâce à une plateforme tout-en-un.',
      icon: Dash,
    },
    card3: {
      title: 'Paiement Sécurisé',
      description: 'Profitez de plusieurs options de paiement sécurisées pour régler vos réservations.',
      icon: Pay,
    },
  };

  return (
    <div className="w-full min-h-screen bg-white px-8 mt-15 ">
      <div className="flex items-center justify-center">
        <span className="text-2xl font-bold">Pourquoi NavTicket ?</span>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mt-10 mx-12">
  {Object.values(elements).map((element, index) => (
    <div
      key={index}
      className="bg-gray-50 shadow-inner rounded-lg p-4 flex flex-col items-center w-full max-w-xs lg:max-w-sm mx-4"
      style={{
        boxShadow: 'inset 0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <img src={element.icon} alt={element.title} className="h-20 w-20 mb-4" />
      <h3 className="text-lg font-bold text-gray-800 mb-2">{element.title}</h3>
      <p className="text-gray-600 text-center">{element.description}</p>
    </div>
  ))}
</div>

    <div className="flex items-center justify-center mt-10">
        <span className="text-2xl font-bold">Nos Services</span>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mt-10 mx-12">
  {Object.values(elements_2).map((element, index) => (
    <div
      key={index}
      className="flex flex-col items-center text-center w-full max-w-xs lg:max-w-sm mx-4"
    >
      <div
        className={`flex items-center justify-center rounded-full h-20 w-20 mb-4`}
        style={{
          backgroundColor: index === 0 ? '#FFDEE9' : index === 1 ? '#C3E5AE' : '#B5D7FF',
        }}
      >
        <img src={element.icon} alt={element.title} className="h-10 w-10" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{element.title}</h3>
      <p className="text-gray-600">{element.description}</p>
    </div>
  ))}
</div>

    </div>
  );
}

export default About;
