import React from "react";
import "./AdvertDetail.css";

import Photo from "../../shared/Photo";
import defaultPhoto from "../../../assets/default-photo.png";
import { Button } from '../../shared';

const TagList = (tags) => {
  return (
    <ul className="advert-tags-list">
      {tags.tags.map((tag) => (
        <li className="advert-tag-item" key={tag}>#{tag}</li>
      ))}
    </ul>
  );
};

const AdvertDetail = ({ advert }) => {
  console.log(advert);
  const { name, sale, price, tags, photo } = { ...advert };
  const textSale = (sale) => (sale ? "Se vende" : "Se compra");
  const srcPhoto = photo ? `${process.env.REACT_APP_API_BASE_URL}${photo}` : defaultPhoto;
  return (
    <article className="advert-container bordered">
      <div className="advert-header">
        <span className="advert-name">{name}</span>
      </div>
      <div className="advert-content">
        <div className="advert-info">
          <div className="advert-sale">{textSale(sale)}</div>
          <div className="advert-price">{price} €</div>
        </div>
        <div className="advert-photo-container">
          {/* <Photo src={photo || defaultPhoto} className="advert-photo" /> */}
          <Photo src={srcPhoto} className="advert-photo" />
        </div>
        {tags.length ? <TagList tags={tags} /> : <p />}
      </div>
      <div className="advert-container-delete-button">
        <Button className="advert-delete-button" variant="primary">Borrar anuncio</Button>
      </div>
    </article>
  );
};

export default AdvertDetail;
