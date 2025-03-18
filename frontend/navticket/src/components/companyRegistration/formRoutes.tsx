import React from "react";
import { Routes, Route, } from "react-router-dom";
import PlanStep from "./setps/planStep";
import CompanyStep from "./setps/companyStep";
//import RoutesStep from "./setps/routeStep";
//import BusTypeStep from "./setps/busTypeStep";
//import ScheduleStep from "./setps/scheduleStep";
import ReviewStep from "./setps/rewiewStep";
import { useNavigate } from "react-router-dom";
import CompanyRegistrationForm from "./companyRegistrationForm";
import { RegistrationProvider} from "../../context/FormContext";


const FormRoutes: React.FC = () => {
    const navigate = useNavigate();
  
    const goNext = (nextPath: string) => {
      navigate(nextPath);
    };
  
    const goBack = (prevPath: string) => {
      navigate(prevPath);
    };
    console.log("FormRoutes rendered");
  
    return (
      <RegistrationProvider>
        <Routes>
          {/* Main route for company registration */}
          <Route path="/" element={<CompanyRegistrationForm />}>
            {/* Nested routes */}
            <Route
              path="plan"
              element={<PlanStep goNext={() => goNext("/company-registration/company")} />}
            />
            <Route
              path="company"
              element={
                <CompanyStep
                  goNext={() => goNext("/company-registration/review")}
                  goBack={() => goBack("/company-registration/plan")}
                />
              }
            />
             
          
            

              <Route
              path="review"
              element={
                <ReviewStep
                  goBack={() => goBack("/company-registration/company")}
                />

              }
            />
            
          </Route>
          
        </Routes>
      </RegistrationProvider>
    );
  };
  
  export default FormRoutes;
