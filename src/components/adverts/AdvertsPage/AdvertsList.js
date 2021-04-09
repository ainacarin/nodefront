import React from "react";
import { Link } from "react-router-dom";
import Advert from "./Advert";
import FiltersAdverts from "./FiltersAdverts";

const AdvertsList = ({ advertsList }) => {
  const advertsInit = advertsList.map((advert) => advert);
  const [adverts, SetAdverts] = React.useState(advertsInit);

  const checkNameValue = (advertName, filterName) => {
    // console.log('check name advert', advertName);
    // console.log('check name filter', filterName);

    // if(filterName.trim()){
    //   return true;
    // } else {
      if(filterName.trim() == "" || advertName.includes(filterName)) {
    // console.log('check name true');
        return true;
      // }
    } else {
      // console.log('check name false');      
      return false;
    }
  };
  
  const checkSaleValue = (advertSale, filterSale) => {
    // console.log('sale advert', advertSale);
    // console.log('sale filter', filterSale);
    const advertValue = advertSale === true ? 'true' : 'false';
    // console.log('sale advert value', advertValue);

    if(filterSale == "all" || filterSale == "") {
    // console.log('check sale true');

      return true;
    } else {
      if(filterSale == advertValue) {
    // console.log('check sale true');

        return true; 
      }else {
    // console.log('check sale false');

        return false;
      }
    }
  };

  const checkPriceValue = (advertPrice, filterMinPrice, filterMaxPrice) => {
    // console.log('price advert', advertPrice);
    // console.log('price advert typeof', typeof(advertPrice));
    // console.log('price min filter', filterMinPrice);
    // console.log('price max filter', filterMaxPrice);
    // console.log('price min filter typeof', typeof(filterMinPrice));
    // console.log('price max filter typeof', typeof(filterMaxPrice));

    const filterMinPriceNumber = Number.parseFloat(filterMinPrice);
    const filterMaxPriceNumber = Number.parseFloat(filterMaxPrice);
    if(filterMinPriceNumber <= advertPrice){
      if(filterMaxPriceNumber == 0.00){
    // console.log('check min price true');

        return true;
      } else{
        if(advertPrice <= filterMaxPriceNumber){
    // console.log('check max price true');

          return true;
        } else{
    // console.log('check min max price false vacio');

          return false;
        }
      }
    }
  };

  const checkTagsValue = (advertTags, filterTags) => {
    // console.log('tags advert', advertTags);
    // console.log('tags filter', filterTags);

    let found = true;
    if(filterTags.length > 0) {
      for(let i = 0; i < filterTags.length && found; i++){
        if(!advertTags.includes(filterTags[i])){
          found = false;
        }
      }
      if(found == true){
    // console.log('incluye los tags');

        return found;
      }
    }
    // console.log('tags filters vacios');

    return found;
  };

  // const checkFilterAdvert = (advert, filter) => {
  //   console.log("on checkFilterAdvert advert", advert);
  //   console.log("on checkFilterAdvert filter", filter);

  //  return(
  //     checkNameValue(advert.name, filter.name) &&
  //     checkSaleValue(advert.sale, filter.sale) &&
  //     checkPriceValue(advert.price, filter.minPrice, filter.maxPrice) &&
  //     checkTagsValue(advert.tags, filter.tags)
  //   );
  // };

  const handleFilters = (filters) => {
    console.log("on handleFilters pressed");

    // part object filters
    console.log("on handle filters advertsList", filters);
    // const { name, sale, minPrice, maxPrice, tags } = { ...filters };
    // console.log("on handle filters advertsList name", name);
    // console.log("on handle filters advertsList sale", sale);
    // console.log("on handle filters advertsList minPrice", minPrice);
    // console.log("on handle filters advertsList maxPrice", maxPrice);
    // console.log("on handle filters advertsList tags", tags);
    SetAdverts(advertsInit);

    const filtersResult = adverts.filter((advert) =>  {
      // console.log('in filter advert', advert);
      // console.log('in filter filter', filters);
      return checkNameValue(advert.name, filters.name) && 
      checkSaleValue(advert.sale, filters.sale) &&
      checkPriceValue(advert.price, filters.minPrice, filters.maxPrice) &&
      checkTagsValue(advert.tags, filters.tags);

      // checkNameValue(advert.name, filters.name) &&
      // checkSaleValue(advert.sale, filters.sale) &&
      // checkPriceValue(advert.price, filters.minPrice, filters.maxPrice) &&
      // checkTagsValue(advert.tags, filters.tags)
    }
        );
    console.log("filters result", filtersResult);

    SetAdverts(filtersResult);
    /**part 1 */
    // console.log("name", name);
    // const filterNameAdverts = adverts.filter((advert) =>
    //   advert.name.includes(name)
    // );
    //     SetAdverts(filterNameAdverts);

    /**part 2 */
    //   console.log("names filtered", filte

    // const { name, sale } = { ...filters };
    // let filtersResult = [];

    // console.log("name", name);
    // if(name) {
    //   const filterNameAdverts = adverts.filter((advert) => advert.name.includes(name));
    //   console.log("names filtered", filterNameAdverts);
    //   filtersResult.concat(filterNameAdverts);
    // }
    // console.log("sale", sale);
    // if(sale) {
    //   const filterSaleAdverts = adverts.filter((advert) => advert.name.includes(name));
    //   console.log("names filtered", filterNameAdverts);
    //   filtersResult.concat(filterNameAdverts);
    // }

    // SetAdverts(filterNameAdverts);
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
