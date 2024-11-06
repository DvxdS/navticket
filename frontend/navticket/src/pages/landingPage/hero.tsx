import BusInput from "../../components/input";


function Hero(){
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-white to-sky-200 px-8 mt-20">
            <div className="p-8 text-center">
        <span className="block text-6xl font-extrabold text-neutral-800">
            <span className="text-sky-400">Réservez</span> vos 
            <span className="text-sky-400"> Tickets</span> de 
            <span className="text-sky-400"> Cars</span> <br /> 
            en toute Simplicité <br /> avec 
            <span className="text-sky-400"> NavTicket</span>
        </span>

        <div className="mt-8">
            <BusInput/>
        </div>
        <div className="mt-10">
        <button className="group h-12 select-none rounded-lg bg-[#27CA70] px-6 text-lg leading-12 text-zinc-50 shadow-[0_-1px_0_1px_#1a8c55_inset,0_0_0_1px_#21a062_inset,0_0.5px_0_1.5px_#47d48f_inset] hover:bg-[#24b566] active:bg-[#1f9e5b] active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.6)_inset]">
    <span className="block font-semibold group-active:[transform:translate3d(0,1px,0)]">Appliquer</span>
</button>
        </div>

            </div>
            
        </div>
    );

}

export default Hero