import React from "react";
import { Button } from "../../shared";
import FormField from "../../shared/FormField";
import { getAllTags } from '../../../api/adverts';
import "./NewAdvertForm.css";

const TagsList = (tags, onChange) => {
  return (
    <div className="tagsAdvertForm-container">
      <legend>Elija los tags asociados al anuncio</legend>
      <ul className="tagsAdvertForm-list">
        {tags.tags.map((tag) => (
          <li className="tagsAdvertForm-item" key={tag}>
            <FormField
              type="checkbox"
              name="tag"
              label={tag}
              className="tagAdvertForm-item"
              value={tag}
              id={tag}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const NewAdvertForm = ({ onSubmit }) => {
  const [advert, setAdvert] = React.useState({
    name: "",
    sale: "",
    price: 0,
    tags: [],
    photo: ""
  });
  const [tagsList, setTagsList] = React.useState([]);

  const handleChangeCheckbox = (event) => {
    console.log('checkbox event', event);
  };

  const handleChangeAdvert = (event) => {
    console.log('on handleChangeAdvert', event.target.value);
    setAdvert((oldAdvert) => {
      const newAdvert = {
        ...oldAdvert,
        [event.target.name]: event.target.value,
      };
      return newAdvert;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // onSubmit(advert);
    console.log('on submit', event);
  };

  React.useEffect(async () => {
    try {
      const listTags = await getAllTags();
      console.log('tags list', listTags);
      setTagsList(listTags);
    } catch (error) {
      console.log(error.error);
    }
  }, []);

  const { name, sale, price, tags, photo } = { ...advert };
  console.log('name', name);
  console.log('sale', sale);
  console.log('price', price);
  console.log('tags', tags);
  console.log('photo', photo);
  console.log('advert', advert);

  return (
    <form className="newAdvertForm-form" onSubmit={handleSubmit}>
      <FormField
        type="text"
        name="name"
        label="Artículo"
        id="name"
        className="nameAdvertForm-field"
        value={name}
        required
        onChange={handleChangeAdvert}
      />
      <div className="saleAdvertForm-container" required>
        <p className="saleAdvertForm-container-title">Que desea hacer? Elija una opción</p>
        <FormField
          type="radio"
          name="sale"
          label="Se vende"
          className="saleAdvertForm-field"
          value="true"
          id="true"
          onChange={handleChangeAdvert}
        />
        <FormField
          type="radio"
          name="sale"
          label="Se compra"
          className="saleAdvertForm-field"
          value="false"
          id="false"
          onChange={handleChangeAdvert}
        />
      </div>
      <FormField
        type="number"
        name="price"
        label="Precio €"
        className="priceAdvertForm-field"
        value={price}
        step="0.01"
        min="0.00"
        required
        onChange={handleChangeAdvert}
      />
      {/* {tagsList.length ? <TagsList tags={tagsList} onChange={handleChangeCheckbox} required /> : <p>No hay tags disponibles</p>} */}
      {tagsList.length ? <TagsList tags={tagsList} onChange={handleChangeCheckbox} required /> : <p>No hay tags disponibles</p>}
      <FormField
        type="file"
        name="photo"
        label="Imagen del artículo"
        id="photo"
        className="photoAdvertForm-field"
        accept="image/*"
      />
      <Button
        type="submit"
        className="newAdvertForm-submit"
        variant="primary"
        disabled={true}
      >
        Crear anuncio
      </Button>
    </form>
  );
};

export default NewAdvertForm;
