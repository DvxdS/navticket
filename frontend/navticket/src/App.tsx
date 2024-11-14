

import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/landingPage/home'
import LoginForm from './pages/auth/login';
import SignUpForm from './pages/auth/signup';

function App() {
  

  
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path ="/signup" element={<SignUpForm/>}/>
      </Routes>
    );

    
  
}

export default App
