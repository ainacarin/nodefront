import React from "react";
import { Link } from "react-router-dom";
import Advert from "./Advert";
import FiltersAdverts from "./FiltersAdverts";

const AdvertsList = ({ advertsList }) => {
  const advertsInit = advertsList.map((advert) => advert);
  const [adverts, SetAdverts] = React.useState(advertsInit);

  const checkNameValue = (advertName, filterName) => {
    if (filterName.trim() == "" || advertName.includes(filterName)) {
      return true;
    } else {
      return false;
    }
  };

  const checkSaleValue = (advertSale, filterSale) => {
    const advertValue = advertSale === true ? "true" : "false";

    if (filterSale == "all" || filterSale == "") {
      return true;
    } else {
      if (filterSale == advertValue) {
        return true;
      } else {
        return false;
      }
    }
  };

  const checkPriceValue = (advertPrice, filterMinPrice, filterMaxPrice) => {
    const filterMinPriceNumber = Number.parseFloat(filterMinPrice);
    const filterMaxPriceNumber = Number.parseFloat(filterMaxPrice);
    console.log('number filter', typeof(filterMinPrice));
    console.log('number filter', typeof(filterMaxPrice));
    console.log('number advert', typeof(advertPrice));

    
    if (filterMinPriceNumber <= advertPrice) {
      if (filterMaxPriceNumber == 0.0) {
        return true;
      } else {
        if (advertPrice <= filterMaxPriceNumber) {
          return true;
        } else {
           return false;
        }
      }
    }
  };

  const checkTagsValue = (advertTags, filterTags) => {
    let found = true;
    if (filterTags.length > 0) {
      for (let i = 0; i < filterTags.length && found; i++) {
        if (!advertTags.includes(filterTags[i])) {
          found = false;
        }
      }
      if (found == true) {
         return found;
      }
    }
    return found;
  };

    const handleFilters = (filters) => {
    // part object filters
    console.log("on handle filters advertsList", filters);
    const filtersResult = advertsInit.filter((advert) => {
      // console.log('in filter advert', advert);
      // console.log('in filter filter', filters);
      return (
        checkNameValue(advert.name, filters.name) &&
        checkSaleValue(advert.sale, filters.sale) &&
        checkPriceValue(advert.price, filters.minPrice, filters.maxPrice) &&
        checkTagsValue(advert.tags, filters.tags)
      );
    });
    console.log("filters result", filtersResult);

    SetAdverts(filtersResult);
  };

  const handleCloseFilters = () => {
    console.log("on handleCleanFilters");
    SetAdverts(advertsInit);
  };

  return (
    <div>
      <FiltersAdverts
        handleFilters={handleFilters}
        handleCloseFilters={handleCloseFilters}
      ></FiltersAdverts>
      <div className="advertsList">
        {adverts.map((advert, i) => (
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
