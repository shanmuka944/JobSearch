import React, { useState } from "react";

const Jobcard = ({ job }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <>
      <div className="card" style={{ width: " 18rem" }}>
        <div>
          <h1>Google</h1>
          <h3>{job.location}</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">About Company</h5>
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
