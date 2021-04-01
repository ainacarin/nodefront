import React from "react";
import "./AdvertDetail.css";

import Photo from "../../shared/Photo";
import defaultPhoto from "../../../assets/default-photo.png";

const TagList = ({ tags }) => {
  return (
    <ul className="advert-tags-list">
      {/* {tags.map((tag) => (
        <li className="advert-tag-item" key={tag}>{tag}</li>
      ))} */}
      {tags}
    </ul>
  );
};

const AdvertDetail = ({ advert }) => {
  const textSale = (sale) => (sale ? "Se vende" : "Se compra");
  console.log(advert);
  const { name, sale, price, tags } = { ...advert };
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
          <Photo src={defaultPhoto} className="advert-photo" />
        </div>
        {/* <ul className="advert-tags-list">

        </ul> */}
        {/* {tags} */}
        <TagList tags={tags} />
      </div>
    </article>
  );
};

export default AdvertDetail;
