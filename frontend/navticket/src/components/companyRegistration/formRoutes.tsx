import React from "react";
import { Routes, Route } from "react-router-dom";
import PlanStep from "./setps/planStep";
import CompanyStep from "./setps/companyStep";
import RoutesStep from "./setps/routeStep";
import ScheduleStep from "./setps/scheduleStep";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
// Navigation functions
const goNext = (nextPath: string) => {
    navigate(nextPath);
  };

  const goBack = (prevPath: string) => {
    navigate(prevPath);
  };
const FormRoutes: React.FC = () => {
    return (
        <Routes>
          <Route
            path="/company-registration/plan"
            element={<PlanStep goNext={() => goNext("/company-registration/company")} />}
          />
          <Route
            path="/company-registration/company"
            element={<CompanyStep 
                        goNext={() => goNext("/company-registration/routes")} 
                        goBack={() => goBack("/company-registration/plan")} 
                     />}
          />
          <Route
            path="/company-registration/routes"
            element={<RoutesStep 
                        goNext={() => goNext("/company-registration/schedules")} 
                        goBack={() => goBack("/company-registration/company")} 
                     />}
          />
          <Route
            path="/company-registration/schedules"
            element={<ScheduleStep 
                        goNext={() => goNext("/review")} 
                        goBack={() => goBack("/company-registration/routes")} 
                     />}
          />
        </Routes>
      );
      
};

export default FormRoutes;
