import React from "react";
import { Routes, Route, } from "react-router-dom";
import PlanStep from "./setps/planStep";
import CompanyStep from "./setps/companyStep";
import RoutesStep from "./setps/routeStep";
import BusTypeStep from "./setps/busTypeStep";
import ScheduleStep from "./setps/scheduleStep";
import ReviewStep from "./setps/rewiewStep";
import { useNavigate } from "react-router-dom";
import CompanyRegistrationForm from "./companyRegistrationForm";
import { FormProvider } from "../../context/FormContext";


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
      <FormProvider>
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
                  goNext={() => goNext("/company-registration/bus-types")}
                  goBack={() => goBack("/company-registration/plan")}
                />
              }
            />
             <Route
            path="bus-types"
            element={
              <BusTypeStep
                goNext={() => goNext("/company-registration/routes")}
                goBack={() => goBack("/company-registration/company")}
              />
            }
          />
          <Route
            path="routes"
            element={
              <RoutesStep
                goNext={() => goNext("/company-registration/schedules")}
                goBack={() => goBack("/company-registration/bus-types")}
              />
            }
          />
            <Route
              path="schedules"
              element={
                <ScheduleStep
                  goNext={() => goNext("/company-registration/review")}
                  goBack={() => goBack("/company-registration/routes")}
                />

              }
            />

              <Route
              path="review"
              element={
                <ReviewStep
                  goBack={() => goBack("/company-registration/schedules")}
                />

              }
            />
            
          </Route>
          
        </Routes>
      </FormProvider>
    );
  };
  
  export default FormRoutes;
