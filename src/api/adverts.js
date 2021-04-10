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
  const data = new FormData();
  data.append("name", advert.name);
  data.append("sale", advert.sale);
  data.append("price", advert.price);
  data.append("tags", advert.tags);
  if (advert.photo) {
    data.append("photo", advert.photo);
  }

  const url = `${advertsBaseUrl}/adverts`;
  return client.post(url, data);
};
