import React from 'react';
import './Advert.css';

const Advert = ({ name, sale, price, tags, photo }) => {

  return (
    <article className="advert bordered">
      <div className="right">
        <div className="advert-header">
          <span className="advert-name">{name}</span>
        </div>
        <div>
          <p className="advert-sale">{sale}</p>
          <p className="advert-price">{price}</p>
          <ul className="advert-tags">
            {tags.map((tag,i) => <li key={i}>{tag}</li>)}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default Advert;
