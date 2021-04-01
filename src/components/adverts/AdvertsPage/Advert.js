import React from 'react';
import './Advert.css';

const Advert = ({ name, sale, price, tags, photo }) => {

  const textSale = (sale) => sale ? "Se vende" : "Se compra";

  return (
    <article className="advert bordered">
      <div className="right">
        <div className="advert-header">
          <span className="advert-name">{name}</span>
        </div>
        <div>
          <p className="advert-sale">{textSale(sale)}</p>
          <p className="advert-price">{price} €</p>
          <ul className="advert-tags-list">
            {tags.map((tag,i) => <li className="advert-tag-item" key={i}>#{tag}</li>)}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default Advert;
