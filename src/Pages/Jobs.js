import React, { useEffect, useState, useCallback } from "react";
import Jobcard from "./Components/Jobcard";
import Search from "./Components/Search";
import { ScaleLoader } from "react-spinners";

const URL = "https://api.weekday.technology/adhoc/getSampleJdJSON";

const Jobs = () => {
  const [isLoading, setisLoading] = useState(true);
  const [jobs, setjobs] = useState([]);
  const [index, setIndex] = useState(1);
  const [filters, setFilters] = useState({
    roleFilter: [],
    minexpfilter: [],
    locFilter: [],
    remoteFilter: "",
    minSalFilter: 0,
  });
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
      setisLoading(false);
      console.log(jobres.jdList);
    } catch (error) {
      console.log("couldnot fetch data");
    } finally {
    }
  };

  useEffect(() => {
    fetchjob();
  }, []);

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setisLoading(true);

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
      console.log(jobres.jdList);
    } catch (error) {
      console.log("couldnot fetch data");
    } finally {
    }
    setIndex((prevIndex) => prevIndex + 1);

    setisLoading(false);
  }, [index, isLoading]);

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
    if (
      filters.roleFilter.length !== 0 ||
      filters.minexpfilter.length !== 0 ||
      filters.locFilter !== 0
    ) {
      let roleResult = filters.roleFilter.length === 0 ? true : false;
      let minexpResult = filters.minexpfilter.length === 0 ? true : false;
      let locationResult = filters.locFilter.length === 0 ? true : false;
      let remoteResult =
        filters.remoteFilter === ""
          ? true
          : filters.remoteFilter === "remote"
          ? job.location === "remote"
            ? true
            : false
          : job.location === "remote"
          ? false
          : true;
      let minSalResult =
        job.minJdSalary == null && filters.minSalFilter == 0
          ? true
          : job.minJdSalary !== null && job.minJdSalary >= filters.minSalFilter
          ? true
          : false;

      console.log(roleResult + " " + minexpResult);
      for (let role in filters.roleFilter) {
        if (job.jobRole.includes(filters.roleFilter[role])) roleResult = true;
      }
      for (let exp in filters.minexpfilter) {
        if (job.minExp != null && job.minExp === filters.minexpfilter[exp])
          minexpResult = true;
      }
      for (let loc in filters.locFilter) {
        if (
          job.location != null &&
          job.location.includes(filters.locFilter[loc])
        )
          locationResult = true;
      }
      return (
        roleResult &&
        minexpResult &&
        locationResult &&
        remoteResult &&
        minSalResult
      );
    } else {
      return true;
    }
  };

  return (
    <>
      <Search filters={filters} setFilters={setFilters}></Search>

      <div class="container text-center">
        <div
          class="row"
          style={{ minHeight: "100vh", maxWidth: "1200px", margin: "0 auto" }}
        >
          {jobs
            .filter((job) => filterJobs(job))
            .map((job, index) => {
              return (
                <div class="col-md-4 mb-2 cardWrapper">
                  <Jobcard key={job.jdUid} job={job} index={index}></Jobcard>
                </div>
              );
            })}
          {isLoading && (
            <ScaleLoader
              cssOverride={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50px",
                marginBottom: "50px",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
