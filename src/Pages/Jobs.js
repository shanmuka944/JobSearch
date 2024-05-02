import React, { useEffect, useState, useCallback } from "react";
import Jobcard from "./Components/Jobcard";
import Search from "./Components/Search";
import { ScaleLoader } from "react-spinners";

const URL = "https://api.weekday.technology/adhoc/getSampleJdJSON";

const Jobs = () => {
  const [loading, setloading] = useState(true);
  const [jobs, setjobs] = useState([]);
  const [index, setIndex] = useState(1);
  const [filters, setFilters] = useState({ roleFilter: [] });
  const [fetchFlag, setFetchFlag] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);
  let currentJobs = [];

  const fetchjob = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      limit: 10,
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
      setjobs(jobres.jdList);
      setTotalJobs(jobres.totalCount);
      setloading(false);
    } catch (error) {
      console.log("couldnot fetch data");
    } finally {
    }
  };

  useEffect(() => {
    fetchjob();
  }, []);

  const fetchData = useCallback(async () => {
    if (loading) return;

    setloading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      limit: 10,
      offset: 10 * index + 1,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    try {
      const response = await fetch(URL, requestOptions);
      const jobres = await response.json();
      setjobs([...jobs, ...jobres.jdList]);
    } catch (error) {
      console.log("couldnot fetch data");
    } finally {
    }
    setIndex((prevIndex) => prevIndex + 1);

    setloading(false);
  }, [index, loading]);

  useEffect(() => {
    console.log("called");
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  const filterJobs = (job) => {
    if (filters.roleFilter.length !== 0) {
      let result = false;
      for (let role in filters.roleFilter) {
        if (job.jobRole.includes(filters.roleFilter[role])) result = true;
      }
      return result;
    } else {
      return true;
    }
  };

  return (
    <>
      <Search filters={filters} setFilters={setFilters}></Search>

      <div class="container text-center">
        <div class="row" style={{ minHeight: "100vh" }}>
          {jobs
            .filter((job) => filterJobs(job))
            .map((job, index) => {
              return (
                <div class="col-md-4 mb-2">
                  <Jobcard key={job.jdUid} job={job} index={index}></Jobcard>
                </div>
              );
            })}
          {loading && <ScaleLoader />}
        </div>
      </div>
    </>
  );
};

export default Jobs;
