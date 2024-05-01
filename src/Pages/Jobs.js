import React, { useEffect, useState, useCallback } from "react";
import Jobcard from "./Components/Jobcard";
import Search from "./Components/Search";

const URL = "https://api.weekday.technology/adhoc/getSampleJdJSON";

const Jobs = () => {
  const [loading, setloading] = useState(false);
  const [jobs, setjobs] = useState([]);
  const [index, setIndex] = useState(0);
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

  return (
    <>
      <Search></Search>

      <div class="container text-center">
        <div class="row">
          {jobs.map((job, index) => {
            return (
              <div class="col-md-4 mb-2">
                <Jobcard key={job.jdUid} job={job} index={index}></Jobcard>
              </div>
            );
          })}
          {loading && "Please wait loading"}
        </div>
      </div>
    </>
  );
};

export default Jobs;
