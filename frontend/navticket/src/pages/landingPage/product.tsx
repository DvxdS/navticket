import Dashboard from '../../assets/dash_na.png';

function Product() {
  return (
    <div className="w-full min-h-auto bg-white px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex items-center justify-center">
        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
          <span className="text-sky-500">Dashboard </span>
          Tout-en-Un
        </span>
      </div>

      <div className="flex items-center justify-center mt-6 sm:mt-8 lg:mt-10 px-4 sm:px-8">
        <p className="text-center text-base sm:text-lg lg:text-xl font-medium">
          Une interface intuitive <br className="hidden sm:block" /> 
          pour gérer facilement vos réservations, trajets, et
          expéditions en un seul endroit.
        </p>
      </div>

      {/* Image with gradient blur effect */}
      <div className="flex items-center justify-center mt-6 sm:mt-8 lg:mt-10 relative px-4 sm:px-8 lg:px-20">
        <img 
          src={Dashboard} 
          alt="Dashboard" 
          className="w-full max-w-md sm:max-w-lg lg:max-w-3xl object-cover rounded-lg" 
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-white to-transparent"
          style={{ filter: 'blur(6px)' }}
        />
      </div>
      <br />
      <br />
    </div>
  );
}

export default Product;

