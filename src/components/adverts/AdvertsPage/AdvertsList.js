import React from 'react';
import { Link } from 'react-router-dom';
import Advert from './Advert';

const AdvertsList = ({ adverts }) => {

  return (
    <div className="advertsList">
      {adverts.map((advert,i) => (
        // <li key={advert.id}>
          <Link to={`/advert/${advert.id}`} key={advert.id}>
            <Advert
              {...advert}
            />
          </Link>
        // </li>
      ))}
     </div>
  );
};

export default AdvertsList;
