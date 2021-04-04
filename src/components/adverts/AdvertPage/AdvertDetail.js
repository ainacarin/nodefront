import React from "react";
import "./AdvertDetail.css";
import { deleteAdvert } from '../../../api/adverts';
import Photo from "../../shared/Photo";
import defaultPhoto from "../../../assets/default-photo.png";
import { Button } from "../../shared";
import ModalConfirm from "../../shared/ModalConfirm";

const TagList = (tags) => {
  return (
    <ul className="advert-tags-list">
      {tags.tags.map((tag) => (
        <li className="advert-tag-item" key={tag}>
          #{tag}
        </li>
      ))}
    </ul>
  );
};

const AdvertDetail = ({ advert, ...routeProps }) => {
  // console.log(advert);
  const { id, name, sale, price, tags, photo } = { ...advert };
  const textSale = (sale) => (sale ? "Se vende" : "Se compra");
  const srcPhoto = photo
    ? `${process.env.REACT_APP_API_BASE_URL}${photo}`
    : defaultPhoto;
  const [isConfirmDisplay, setIsConfirmDisplay] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { history } = { ...routeProps };

  const callback = async (flag) => {
    console.log("flag", flag);
    setIsConfirmDisplay(false);
    if (flag) {
      console.log("user confirm delete advert");
      // delete advert
      try {
        const resultDelete = await deleteAdvert(id);
        // redirect main page
        history.push("/");
      } catch (error) {
        const errorText = error.error;
        setError(errorText);
      }
    }
  };

  const resetError = () => setError(null);

  const buttonPressed = () => setIsConfirmDisplay(true);

  return (
    <article className="advert-container bordered">
      {error && (
        <div onClick={resetError} className="advertPage-error">
          {error}
        </div>
      )}
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
        <Button
          className="advert-delete-button"
          variant="primary"
          onClick={buttonPressed}
        >
          Borrar anuncio
        </Button>
        {isConfirmDisplay && (
          <ModalConfirm
            title="¿Está seguro?"
            message="Esta acción no tiene vuelta atrás"
            buttonPressed={callback}
          />
        )}
      </div>
    </article>
  );
};

export default AdvertDetail;
