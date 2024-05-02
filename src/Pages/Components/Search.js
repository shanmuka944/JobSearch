import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";

const Search = ({ filters, setFilters }) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Multiselect
          displayValue="role"
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
        <Multiselect
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
        <Multiselect
          displayValue="location"
          isObject={false}
          onKeyPressFn={function noRefCheck() {}}
          onRemove={function noRefCheck() {}}
          onSearch={function noRefCheck() {}}
          onSelect={function noRefCheck() {}}
          options={["bangalore", "mumbai", "delhi ncr", "chennai"]}
        />
        <Multiselect
          isObject={false}
          onKeyPressFn={function noRefCheck() {}}
          onRemove={function noRefCheck() {}}
          onSearch={function noRefCheck() {}}
          onSelect={function noRefCheck() {}}
          options={["remote", "onsite"]}
        />
      </div>
    </>
  );
};

export default Search;
