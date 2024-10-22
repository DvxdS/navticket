
function BusInput(){
    return (
        <div className="bg-cyan-800 rounded-lg p-4 w-full max-w-3xl mx-auto mt-6 h-auto sm:h-32 flex items-center justify-center">
            <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
                {/* Dropdown for 'Choisir Compagnie' */}
                <select className="bg-white text-gray-700 rounded-md p-3  w-full sm:w-1/3">
                    <option value="" disabled selected>
                         Compagnie
                    </option>
                    {/* Add options for bus companies here */}
                    <option value="company1">Company 1</option>
                    <option value="company2">Company 2</option>
                </select>
    
                {/* Dropdown for 'Départ' */}
                <select className="bg-white text-gray-700 rounded-md p-3 w-full sm:w-1/3">
                    <option value="" disabled selected>
                        Départ
                    </option>
                    {/* Add options for departure cities here */}
                    <option value="city1">City 1</option>
                    <option value="city2">City 2</option>
                </select>
    
                {/* Dropdown for 'Arrivée' */}
                <select className="bg-white text-gray-700 rounded-md p-3 w-full sm:w-1/3">
                    <option value="" disabled selected>
                        Arrivée
                    </option>
                    {/* Add options for arrival cities here */}
                    <option value="city1">City 1</option>
                    <option value="city2">City 2</option>
                </select>
            </div>

            <div>
                
            </div>
        </div>
    );
    

}

export default BusInput