import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/landingPage/home';
import LoginForm from './pages/auth/login';
import SignUpForm from './pages/auth/signup';
import AuthForm from './pages/auth/companyAuth';
import CompanyLogin from './pages/auth/comapnyLogin';
import FormRoutes from './components/companyRegistration/formRoutes';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/companylogin" element={<CompanyLogin />} />
        
        {/* Form Routes */}
        <Route path="/company-registration/*" element={<FormRoutes />} />
      </Routes>
    
  );
}

export default App;
