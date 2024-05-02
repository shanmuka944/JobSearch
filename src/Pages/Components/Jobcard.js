import React, { useState } from "react";

const Jobcard = ({ job, index }) => {
  const [readMore, setReadMore] = useState(false);
  const i = 1;
  const random = () => {
    return Math.floor(Math.random() * 100) + 1;
  };
  return (
    <>
      <div className="card" style={{ width: " 18rem" }}>
        <div>
          <h1>{`Google ${random()}`}</h1>
          <h3>{job.location}</h3>
          <h4>{job.jobRole}</h4>
        </div>
        <div className="card-body">
          <h5 className="card-title">About Company - {job.minJdSalary}</h5>
          <p className="card-text">
            {readMore
              ? job.jobDetailsFromCompany
              : `${job.jobDetailsFromCompany.substring(0, 200)}...`}
            <button onClick={() => setReadMore(!readMore)}>
              {readMore ? "show less" : "  read more"}
            </button>
          </p>
          <a href={job.jdLink} className="btn btn-primary">
            Apply
          </a>
          <a
            href="#"
            className="btn btn-primary"
            style={{ marginLeft: "3rem" }}
          >
            Get Referral
          </a>
        </div>
      </div>
    </>
  );
};

export default Jobcard;
