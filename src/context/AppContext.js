import { useReducer, createContext } from "react";
import MockData from "../mock-data.json";

const initState = null;
const userReducer = (state, action) => {
  switch (action.type) {
    case "setSelectedPlan":
      return { ...state, ...action.payload, selectedCost: null };
    case "setSelectedCost":
      return { ...state, ...action.payload };
    case "addCost":
      console.log(action.payload);
      const GP = state.generalPlans.map((gplan) => {
        if (gplan.id === action.payload.idGPlan) {
          gplan.plans = gplan.plans.map((plan) => {
            if (plan.id === action.payload.idPlan) {
              plan.costs = [...plan.costs, ...action.payload.costs];
              console.log(plan, action.payload.costs);
            }
            return plan;
          });
        }
        return gplan;
      });
      console.log(GP);

      return { ...state, generalPlans: GP };
    case "addGeneralPlan":
      return {
        ...state,
        generalPlans: [...state.generalPlans, { ...action.payload }],
      };
    default:
      return { ...state };
  }
};

const AppState = createContext(initState);

function ProviderApp({ children }) {
  const [state, dispatch] = useReducer(userReducer, {
    generalPlans: MockData.general_plans,
    selectedPlan: MockData.general_plans[0].plans[0],
    selectedCost: null,
  });

  return (
    <AppState.Provider value={{ state, dispatch }}>
      {children}
    </AppState.Provider>
  );
}

export { AppState, ProviderApp };
