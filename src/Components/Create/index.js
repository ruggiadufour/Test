import React from "react";
import { AppState } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
const Create = () => {
  const { state, dispatch } = React.useContext(AppState);

  const history = useHistory();

  const [data, setData] = React.useState({
    id: state.generalPlans.length + 1,
    title: "",
    plans: [],
  });
  const initPlan = {
    id: 0,
    image: "icons/dashboard.svg",
    name: "",
    desc: "",
    isNew: false,
    isComing: true,
    costs: [],
  };
  const [plan, setPlan] = React.useState(initPlan);
  const [addOneMore, setAddOneMore] = React.useState(true);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setPlan({ ...plan, [name]: value });
  }

  function save(e) {
    e.preventDefault();
    if (data.plans.length !== 0) {
      dispatch({
        type: "addGeneralPlan",
        payload: { ...data, id: data.title + data.id },
      });
      history.push("/");
    }
  }

  function addPlan(e) {
    e.preventDefault();
    setAddOneMore(false);
    setData({
      ...data,
      plans: [...data.plans, { ...plan, id: plan.name + plan.desc }],
    });
    setPlan(initPlan);
  }

  return (
    <form onSubmit={save} className="screen__right flex col create-style">
      <h1>Create New Plan</h1>

      <input
        name="title"
        value={data.title}
        onChange={(e) => {
          setData({ ...data, title: e.target.value });
        }}
        type="text"
        required
        placeholder="General title"
      />

      {addOneMore && (
        <>
          <input
            name="name"
            value={plan.name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            required
          />
          <input
            name="desc"
            value={plan.desc}
            onChange={handleChange}
            type="text"
            placeholder="Description"
            required
          />
          <label>
            <input
              name="isNew"
              value={plan.isNew}
              onChange={() => {
                setPlan({ ...plan, isNew: !plan.isNew });
              }}
              type="checkbox"
              id="cbox1"
            />
            Is a new plan?
          </label>
          <label>
            <input
              name="isComing"
              value={plan.coming}
              onChange={() => {
                setPlan({ ...plan, isComing: !plan.isComing });
              }}
              type="checkbox"
              id="cbox1"
            />
            Is comming?
          </label>
          <button
            onClick={addPlan}
            className="button "
            style={{ backgroundColor: "lightblue" }}
          >
            Save this plan
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

export default Create;
