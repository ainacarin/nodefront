import client from './client';

const advertsBaseUrl = '/api/v1';

export const getAllAdverts = () => {
  const url = `${advertsBaseUrl}/adverts`;
  return client.get(url);
};

export const getAdvert = advertId => {
  const url = `${advertsBaseUrl}/adverts/${advertId}`;
  return client.get(url);
};

export const deleteAdvert = advertId => {
  const url = `${advertsBaseUrl}/adverts/${advertId}`;
  return client.delete(url);
};

export const getAllTags = () => {
  const url = `${advertsBaseUrl}/adverts/tags`;
  return client.get(url);
};