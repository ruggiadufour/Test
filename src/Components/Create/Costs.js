import React from "react";
import { AppState } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
const CreateCosts = () => {
  const { state, dispatch } = React.useContext(AppState);
  const history = useHistory();

  const initCost = {
    id: null,
    value: 0,
    cpu: "",
    disk: "",
    transfer: "",
    isAvailable: false,
  };

  const [addOneMore, setAddOneMore] = React.useState(true);
  const [selectedGPlan, setSelectedGPlan] = React.useState("");
  const [plans, setPlans] = React.useState(null);
  const [selectedPlan, setSelectedPlan] = React.useState("");
  const [cost, setCost] = React.useState(initCost);
  const [allNewCosts, setAllNewCosts] = React.useState([]);

  function selectGPlan(e) {
    setSelectedGPlan(e.target.value);
    const parsedGPlan = JSON.parse(e.target.value);
    setPlans(parsedGPlan.plans);
    setSelectedPlan(JSON.stringify(parsedGPlan.plans[0]));
  }

  function selectPlan(e) {
    setSelectedPlan(e.target.value);
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setCost({ ...cost, [name]: value });
  }

  function addCost(e) {
    e.preventDefault();
    setAllNewCosts([...allNewCosts, { ...cost, id: cost.value + cost.cpu }]);
    setCost(initCost);
    setAddOneMore(false)
  }
  
  function save(e) {
    e.preventDefault();

    if (allNewCosts.length !== 0) {
      const GPLAN = JSON.parse(selectedGPlan);
      const PLAN = JSON.parse(selectedPlan);
      dispatch({
        type: "addCost",
        payload: { idGPlan: GPLAN.id, idPlan: PLAN.id, costs: allNewCosts },
      });

      history.push("/");
    }
  }

  return (
    <form onSubmit={save} className="screen__right flex col create-style">
      <h1>Create New Cost</h1>

      <h3>Select a general plan:</h3>
      <select name="select" onChange={selectGPlan} value={selectedGPlan}>
        {state.generalPlans.map((gplan) => (
          <option key={gplan.id} value={JSON.stringify(gplan)}>
            {gplan.title}
          </option>
        ))}
      </select>

      {plans && (
        <>
          <h3>Select the plan you want to add a cost:</h3>
          <select name="select2" onChange={selectPlan} value={selectedPlan}>
            {plans.map((plan) => (
              <option key={plan.id + plan.name} value={JSON.stringify(plan)}>
                {plan.name}
              </option>
            ))}
          </select>
        </>
      )}

      {addOneMore && selectedPlan && (
        <>
          <input
            name="value"
            value={cost.value}
            onChange={(e) => {
              setCost({ ...cost, value: e.target.value });
            }}
            type="number"
            required
            placeholder="Value ($)"
          />

          <input
            name="cpu"
            value={cost.cpu}
            onChange={handleChange}
            type="text"
            placeholder="CPU"
            required
          />
          <input
            name="disk"
            value={cost.disk}
            onChange={handleChange}
            type="text"
            placeholder="Disk"
            required
          />

          <input
            name="transfer"
            value={cost.transfer}
            onChange={handleChange}
            type="text"
            placeholder="Transfer"
            required
          />

          <label>
            <input
              name="isComing"
              value={cost.isAvailable}
              onChange={() => {
                setCost({ ...cost, isAvailable: !cost.isAvailable });
              }}
              type="checkbox"
              id="cbox"
            />
            Is available
          </label>

          <button
            onClick={addCost}
            className="button "
            style={{ backgroundColor: "lightblue" }}
          >
            Save this cost
          </button>
        </>
      )}

      {!addOneMore && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setAddOneMore(true);
          }}
          className="button "
          style={{ backgroundColor: "lightblue" }}
        >
          Add one more plan
        </button>
      )}

      <button type="submit" className="button blue-background">
        Save all
      </button>
    </form>
  );
};

export default CreateCosts;
