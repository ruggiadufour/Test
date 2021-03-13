import React from "react";
import IconButton from "../IconButton";
import {Link, useHistory} from 'react-router-dom'
export default function Navbar() {
  const ref = React.useRef();
  const history = useHistory()

  React.useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);

  function handleUserKeyPress(e) {
    if (e.key === "b" && e.ctrlKey) {
      console.log("is happening");
      ref.current.focus();
    }
  }

  return (
    <nav className="navbar flex">
      <img
        className="navbar__icon flex"
        src="/icons/home.svg"
        alt="home icon"
        onClick={()=>{history.push("/")}}
      />

      <div className="navbar__search flex">
        <img src="/icons/loupe.svg" alt="search loupe" />
        <input
          className="navbar__search_input"
          type="text"
          ref={ref}
          placeholder="Search by resource or public IP (ctrl+B)"
        />
      </div>

      <div className="dropdown is_right">
        <button className="button navbar__right__button">Create 🔽</button>
        <div className="dropdown__content">
          <Link to="/create-plan">Create new plan</Link>
          <Link to="/create-costs">Create new costs</Link>
        </div>
      </div>

      <div className="navbar__right flex">
        <IconButton image="/icons/operator.svg" />
        <IconButton image="/icons/notification.svg" />
        <hr className="vertical-hr" />
        <IconButton image="/icons/blueperson.svg" />
      </div>

      <div className="button_icon hamburger flex dropdown">
        <img
          src="/icons/hamburger.png"
          alt="hamburger icon"
          width="40"
          alt="hamburger icon"
        />
        <div className="dropdown__content">
          <a href="#">
            <IconButton image="/icons/operator.svg" /> Lorem 1
          </a>
          <a href="#">
            <IconButton image="/icons/notification.svg" /> Lorem 2
          </a>
          <a href="#">
            <IconButton image="/icons/blueperson.svg" /> Lorem 3
          </a>
          <br />
          <a href="#">
            <IconButton image="/icons/dashboard.svg" /> Lorem 4
          </a>
          <a href="#">
            <IconButton image="/icons/payment.svg" /> Lorem 5
          </a>
          <a href="#">
            <IconButton image="/icons/mail.svg" /> Lorem 6
          </a>
          <a href="#">
            <IconButton image="/icons/Group 783.svg" /> Lorem 7
          </a>
          <a href="#">
            <IconButton image="/icons/support.svg" /> Lorem 8
          </a>
        </div>
      </div>
    </nav>
  );
}
