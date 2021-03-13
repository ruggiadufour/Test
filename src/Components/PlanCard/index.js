import React, { useContext } from "react";
import { AppState } from "../../context/AppContext";

const PlanCard = ({ data }) => {
  return (
    <div className={`plancard bordercard flex col`}>
      <p className="plancard__title">{data.title.toUpperCase()}</p>
      <div className="flex">
        {data.plans.map((content, i) => (
          <CardContent key={content.name + i} content={content} />
        ))}
      </div>
    </div>
  );
};
const CardContent = ({ content }) => {
  const { state, dispatch } = useContext(AppState);
  return (
    <div
      id={content.id + content.name}
      className={`plancard__content flex ${
        state.selectedPlan.id === content.id
          ? "bordercard-selected"
          : "bordercard"
      }`}
      onClick={() => {
        dispatch({
          type: "setSelectedPlan",
          payload: { selectedPlan: content },
        });
      }}
    >
      <img src={content.image} alt={content.name} />
      <p>{content.name}</p>
      {content.isNew && <span className="info-label">NEW</span>}
      {content.isComing && (
        <span className="info-label plancard__content_comming">
          COMING SOON
        </span>
      )}
    </div>
  );
};

export default PlanCard;
