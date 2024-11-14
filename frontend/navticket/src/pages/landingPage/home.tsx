import Navbar from "./navbar"
import Hero from "./hero"
import About from "./about"
import Product from "./product"
import Pricing from "./pricing"
import Footer from "./footer"

function Home(){
    return(
        <div >
    <Navbar/>
    <br className='mt-10 mb-10'></br>
    <br className='mt-10 mb-10'></br>
    <br className='mt-10 mb-10'></br>
    <Hero/>
    <br className='mt-10 mb-10'></br>
    <br className='mt-10 mb-10'></br>
    <About/>
    <br className='mt-10 mb-10'></br>
    <Product/>
    <br />
    <Pricing/>
    <br />
    <Footer/>

    </div>
    )
}

export default Home