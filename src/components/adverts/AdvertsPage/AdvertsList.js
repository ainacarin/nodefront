import React from "react";
import { Link } from "react-router-dom";
import Advert from "./Advert";
import FiltersAdverts from "./FiltersAdverts";

const AdvertsList = ({ advertsList }) => {
  const advertsInit = advertsList.map((advert) => advert);
  const [adverts, SetAdverts] = React.useState(advertsInit);

  const checkNameValue = (advertName, filterName) => {
    const advertNameLoweCase = advertName.toLowerCase();
    const filterNameLowerCase = filterName.toLowerCase();
    if (filterName.trim() == "" || advertNameLoweCase.includes(filterNameLowerCase)) {
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
    const filtersResult = advertsInit.filter((advert) => {
      return (
        checkNameValue(advert.name, filters.name) &&
        checkSaleValue(advert.sale, filters.sale) &&
        checkPriceValue(advert.price, filters.minPrice, filters.maxPrice) &&
        checkTagsValue(advert.tags, filters.tags)
      );
    });

    SetAdverts(filtersResult);
  };

  const handleCloseFilters = () => {
    SetAdverts(advertsInit);
  };

  return (
    <div className="advertsListPage-container">
      <FiltersAdverts
        handleFilters={handleFilters}
        handleCloseFilters={handleCloseFilters}
      ></FiltersAdverts>
      <div className="advertsList">
        {adverts.map((advert, i) => (
          <Link to={`/advert/${advert.id}`} key={advert.id}>
            <Advert {...advert} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdvertsList;
