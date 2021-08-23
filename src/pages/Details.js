import React from "react";
import reactDom from "react-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetails, getPerson } from "../redux/reducers/peopleDetails/selectors";

export default function Details() {
  const details = useSelector(getDetails)
  const person = useSelector(getPerson)
  console.log(person);
  const { name } = person

  console.log(React.version, reactDom.version);
  if (details.loading) {
    return (
      <h1 className="title">Loading...</h1>
    )
  } else {
    return (
      <div className="box">
        <div className="block">
          <h1 className="title">
            {`Details of ${name}`}
          </h1>
          <button className="button is-link is-light">
            <Link to='/'>
              Back
            </Link>
          </button>
        </div>
      </div>
  )
  }
}