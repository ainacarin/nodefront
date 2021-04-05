import client from "./client";

const advertsBaseUrl = "/api/v1";

export const getAllAdverts = () => {
  const url = `${advertsBaseUrl}/adverts`;
  return client.get(url);
};

export const getAdvert = (advertId) => {
  const url = `${advertsBaseUrl}/adverts/${advertId}`;
  return client.get(url);
};

export const deleteAdvert = (advertId) => {
  const url = `${advertsBaseUrl}/adverts/${advertId}`;
  return client.delete(url);
};

export const getAllTags = () => {
  const url = `${advertsBaseUrl}/adverts/tags`;
  return client.get(url);
};

export const createAdvert = (advert) => {
  console.log('on createAdvert advert', advert);
  // const formData = new FormData();
  // advert.photo = formData;
  // console.log('on createAdvert advert con form data', advert);
  const advertSender = { 
    name: advert.name, 
    sale: advert.sale,
    price: advert.price,
    tags: advert.tags 
  };
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  // const json = JSON.stringify(advert);
  console.log('advertSender', advertSender);
  const json = JSON.stringify(advertSender);
  const url = `${advertsBaseUrl}/adverts`;
  return client.post(url, json, config);
};
