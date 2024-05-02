import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";

const Search = ({ filters, setFilters }) => {
  return (
    <>
      <div className="jobFiltersWrapper row" style={{ display: "flex" }}>
        <div className="jobFilter">
          <Multiselect
            placeholder="Role"
            displayValue="Role"
            isObject={false}
            onKeyPressFn={function noRefCheck() {}}
            onRemove={(selectedvalues) => {
              setFilters({ ...filters, roleFilter: selectedvalues });
            }}
            onSelect={(selectedvalues) => {
              setFilters({ ...filters, roleFilter: selectedvalues });
            }}
            options={["frontend", "backend", "android", "tech lead", "ios"]}
          />
        </div>
        <div className="jobFilter">
          <Multiselect
            placeholder="Min Experience"
            displayValue="minexp"
            isObject={false}
            onKeyPressFn={function noRefCheck() {}}
            onRemove={(selectedvalues) => {
              setFilters({ ...filters, minexpfilter: selectedvalues });
            }}
            onSelect={(selectedvalues) => {
              setFilters({ ...filters, minexpfilter: selectedvalues });
            }}
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          />
        </div>
        <div className="jobFilter">
          <Multiselect
            placeholder="Location"
            displayValue="location"
            isObject={false}
            onKeyPressFn={function noRefCheck() {}}
            onRemove={(selectedvalues) => {
              setFilters({ ...filters, locFilter: selectedvalues });
            }}
            onSelect={(selectedvalues) => {
              setFilters({ ...filters, locFilter: selectedvalues });
            }}
            options={["bangalore", "mumbai", "delhi ncr", "chennai"]}
          />
        </div>
        <div className="jobFilter">
          <select
            placeholder="Remote/Onsite"
            className="form-control"
            onChange={(e) => {
              setFilters({ ...filters, remoteFilter: e.target.value });
            }}
          >
            <option value="">Remote/Onsite</option>
            <option value="remote">Remote</option>
            <option value="onsite">OnSite</option>
          </select>
        </div>
        <div className="jobFilter">
          <input
            type="number"
            placeholder="Min Salary"
            className="form-control"
            onChange={(e) => {
              setFilters({ ...filters, minSalFilter: e.target.value });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
