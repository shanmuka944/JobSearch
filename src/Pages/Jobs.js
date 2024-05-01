import React, { useEffect, useState } from "react";
import Jobcard from "./Components/Jobcard";
import Search from "./Components/Search";

const URL = "https://api.weekday.technology/adhoc/getSampleJdJSON";

const Jobs = () => {
  const [loading, setloading] = useState(true);
  const [jobs, setjobs] = useState([]);
  const fetchjob = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      limit: 6,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    try {
      const response = await fetch(URL, requestOptions);
      const jobres = await response.json();
      console.log(jobres);
      setjobs(jobres.jdList);
      setloading(false);
    } catch (error) {
      console.log("couldnot fetch data");
    } finally {
    }
  };
  useEffect(() => {
    fetchjob();
  }, []);
  return (
    <>
      <Search></Search>

      <div class="container text-center">
        <div class="row">
          {loading && jobs.length != 0
            ? "Loading Please wait"
            : jobs.map((job) => {
                return (
                  <div class="col-md-4 mb-2">
                    <Jobcard job={job}></Jobcard>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Jobs;
