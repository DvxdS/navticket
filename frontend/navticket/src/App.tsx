

import './App.css'
import Hero from './pages/landingPage/hero'
import Navbar from './pages/landingPage/navbar'
import About from './pages/landingPage/about'
import Product from './pages/landingPage/product'
import Pricing from './pages/landingPage/pricing'
import Footer from './pages/landingPage/footer'

function App() {
  

  return (
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

export default App
