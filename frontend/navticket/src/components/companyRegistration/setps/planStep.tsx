import { useState } from "react"

function PlanStep() {

    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const handleSelectPlan = (plan: string) => {
        setSelectedPlan(plan);
        // Optionally, navigate or trigger a callback to save the choice.
      };

    return(
        
    )
}

export default PlanStep