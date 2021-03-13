import React, { useState, useContext } from "react";
import PlanCard from "../PlanCard";
import SpecsCard from "../SpecsCard";
import { ArrowRight, ArrowLeft } from "../ArrowButtons";

import { AppState } from "../../context/AppContext";

const HomeScreen = () => {
  const { state } = useContext(AppState);
  const [showAll, setShowAll] = useState(false);

  //Functions to scroll the cards
  function pushScroll(id) {
    document.getElementById(id).scrollLeft += 200;
  }
  function pullScroll(id) {
    document.getElementById(id).scrollLeft -= 200;
  }

  return (
    <div className="screen__right">
      <div className="screen__right__titles-section">
        <h1>Create New Instance</h1>
        <h2>Choose a plan</h2>

        <div className="flex titles-section__help-plan">
          <a href="#" className="link">
            Help me choose a plan
          </a>
          <img src="/icons/settings2.svg" alt="search loupe" />
        </div>
      </div>

      <div className="relative">
        <ArrowLeft
          callback={() => {
            pullScroll("plans");
          }}
        />
        <ArrowRight
          callback={() => {
            pushScroll("plans");
          }}
        />

        <div id="plans" className="plans flex scrollable-hidden">
          {state.generalPlans.map((plan, i) => (
            <PlanCard key={plan.title + i} data={plan} />
          ))}
        </div>

        <div className="flex">
          {state.generalPlans.map((general_plan) => {
            return general_plan.plans.map((plan, i) => (
              <a
                key={plan.id + plan.name}
                className="plan-cards-ref"
                href={`#${plan.id}${plan.name}`}
              ></a>
            ));
          })}
        </div>
      </div>

      <p>{state.selectedPlan.desc}</p>

      <div className="relative">
        <div
          id="specs"
          className={`plans flex ${showAll ? "wrap" : ""} scrollable-hidden`}
        >
          {state.selectedPlan.costs.map((item) => (
            <SpecsCard key={item.cpu + item.id} data={item} />
          ))}

          {
            state.selectedPlan.costs.length===0 && <h3>There are no costs for this plan</h3>
          }
        </div>

        {!showAll && (
          <>
            <ArrowLeft
              callback={() => {
                pullScroll("specs");
              }}
            />
            <ArrowRight
              callback={() => {
                pushScroll("specs");
              }}
            />
            <div className="flex">
              {state.selectedPlan.costs.map((item) => (
                <a
                  key={item.id + item.cpu}
                  className="plan-cards-ref"
                  href={`#${item.id}${item.cpu}`}
                ></a>
              ))}
            </div>
          </>
        )}
      </div>

      <div
        onClick={() => {
          setShowAll(!showAll);
        }}
        className="link"
      >
        {`Show ${showAll ? "less" : "all plans"}`}
      </div>

      {
          state.selectedCost && <div className="flex col blue-background">
            <h3 className=" blue-background">You have selected the plan:</h3>
            <SpecsCard data={state.selectedCost}/>
            <button className="button white-background">Buy plan now</button>
          </div>
        }

      <p>Each instance adds more data transfer to your account.</p>
    </div>
  );
};

export default HomeScreen;
