import React, {useContext} from 'react'
import { AppState } from "../../context/AppContext";
const SpecsCard = ({ data }) => {
  const {state, dispatch} = useContext(AppState)

  return (
    <div>
      <div
        id={data.id + data.cpu}
        onClick={() => {
          dispatch({type:"setSelectedCost", payload:{selectedCost: data}})
        }}
        className={`specscard ${
          state.selectedCost?.id === data.id ? "bordercard-selected" : "bordercard"
        } flex col`}
        style={{ overflow: "hidden " }}
      >
        {!data.isAvailable && (
          <span className="available-label">NOT AVAILABLE</span>
        )}
        <div className="specscard__price flex">
          <span className="specscard__price_dollar">$</span>
          <span className="specscard__price_value">{data.value}</span>
          <span className="specscard__price_slash">/</span>
          <span className="specscard__price_month">mo</span>
        </div>
        <p>$0.0007/hour</p>
        <hr className="specscard__hr" />
        <p className="specscard_specs">{data.cpu}</p>
        <p className="specscard_specs">{data.disk}</p>
        <p className="specscard_specs">{data.transfer}</p>
      </div>
    </div>
  );
};

export default SpecsCard;
