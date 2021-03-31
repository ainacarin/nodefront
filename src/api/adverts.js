import client from './client';

const advertsBaseUrl = '/api/v1';

export const getAllAdverts = () => {
  const url = `${advertsBaseUrl}/adverts`;
  return client.get(url);
};

