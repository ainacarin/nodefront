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
  data.append('name',advert.name);
  data.append('sale',advert.sale);
  data.append('price',advert.price);
  data.append('tags',advert.tags);
  console.log('photo',advert.photo)
  if (advert.photo) {
    data.append('photo',advert.photo);
  }

  const advertSender = { 
    name: advert.name, 
    sale: advert.sale,
    price: advert.price,
    tags: advert.tags,
    photo: advert.photo
  };
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}
  const url = `${advertsBaseUrl}/adverts`;
  return client.post(url, data);
};
