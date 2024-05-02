import React, { useState } from "react";
import { FaHourglass } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { AiFillThunderbolt } from "react-icons/ai";

const Jobcard = ({ job, index }) => {
  const [readMore, setReadMore] = useState(false);
  const i = 1;
  const random = () => {
    return Math.floor(Math.random() * 100) + 1;
  };
  return (
    <>
      <div className="card">
        <div className="Datetab">⏳ Posted 10 Days ago</div>
        <div className="row cardHeader">
          <div className="col-3 logoContainer">
            <img src={logo} alt="" />
          </div>
          <div className="col-9 detailsContainer">
            <div className="companyName">Google</div>
            <div className="roleContainer text-capitalize">{job.jobRole}</div>
            <div className="loationContainer text-capitalize">
              {job.location}
            </div>
          </div>
        </div>
        <div className="estimatedContainer">
          Estimated Salary :
          {job.minJdSalary !== null ? job.minJdSalary : "Upto"}{" "}
          {job.minJdSalary !== null ? "-" : ""} {job.maxJdSalary} ✅
        </div>
        <div className="card-body text-start">
          <h5
            className="card-title text-left"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            About Company
          </h5>
          <p className="card-text mb-0">
            {readMore
              ? job.jobDetailsFromCompany
              : `${job.jobDetailsFromCompany.substring(0, 200)}...`}
            <button
              className={`${
                !readMore ? "readmoreButton" : "showLessButton"
              } 'btn btn-transparent'`}
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? "show less" : "  read more"}
            </button>
          </p>

          <div style={{ color: "gray", fontWeight: "bold" }}>
            Minimum Experience <br />{" "}
            <span style={{ color: "black" }}>
              {job.minExp !== null ? job.minExp + " Years" : "NA"}
            </span>
          </div>
          <a href={job.jdLink} className="btn btn-primary applyButton">
            ⚡️ Easy Apply
          </a>
          <a href="#" className="btn btn-primary referralButton">
            Get Referral
          </a>
        </div>
      </div>
    </>
  );
};

export default Jobcard;
