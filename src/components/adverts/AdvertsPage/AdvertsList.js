import React from "react";
import { Link } from "react-router-dom";
import Advert from "./Advert";
import FiltersAdverts from "./FiltersAdverts";

const AdvertsList = ({ advertsList }) => {
  const advertsInit = advertsList.map(advert => advert);
  const [adverts, SetAdverts] = React.useState(advertsInit);

  const handleFilters = (name) => {
    console.log("on handleFilters pressed");
    console.log("name", name);

    const filterNameAdverts = adverts.filter((advert) => advert.name.includes(name));
    console.log("names filtered", filterNameAdverts);
    SetAdverts(filterNameAdverts);
  };

  const handleCleanFilters = () => {
    console.log("on handleCleanFilters");
    SetAdverts(advertsInit);

  };

  return (
    <div>
      <FiltersAdverts
        handleFilters={handleFilters}
        handleCleanFilters={handleCleanFilters}
      ></FiltersAdverts>
      <div className="advertsList">
        {adverts.map((advert, i) => (
          // <li key={advert.id}>
          <Link to={`/advert/${advert.id}`} key={advert.id}>
            <Advert {...advert} />
          </Link>
          // </li>
        ))}
      </div>
    </div>
  );
};

export default AdvertsList;
