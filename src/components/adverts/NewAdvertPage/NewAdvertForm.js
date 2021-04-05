import React from "react";
import { Button } from "../../shared";
import FormField from "../../shared/FormField";
import { getAllTags } from '../../../api/adverts';
import "./NewAdvertForm.css";

const TagsList = (tags) => {
  const { onChange } = { ...tags };

  return (
    <div className="tagsAdvertForm-container">
      <legend>Elija los tags asociados al anuncio</legend>
      <ul className="tagsAdvertForm-list">
        {tags.tags.map((tag) => (
          <li className="tagsAdvertForm-item" key={tag}>
            <FormField
              type="checkbox"
              name="tags"
              label={tag}
              className="tagAdvertForm-item"
              value={tag}
              id={tag}
              onChange={onChange}
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

  const updateAdvert = (name, value) => {
    setAdvert((oldAdvert) => {
      const newAdvert = {
        ...oldAdvert,
        // [event.target.name]: event.target.value,
        [name]: value
      };
      return newAdvert;
    });
  }

  const handleChangeCheckbox = (event) => {
    console.log('event.taget.checked', event.target.checked);
    const newTags = tags.slice();
    console.log('newTags', tags);
    console.log('newTags', newTags);
    if(event.target.checked) {
      //add in state advert
      newTags.push(event.target.value);
    } else if(newTags.length) {
      //delete from state advert
      const indexTag = newTags.lastIndexOf(event.target.value);
      if(indexTag > -1) {
        newTags.splice(indexTag, 1);
      }
    }
    updateAdvert(event.target.name, newTags);
  };

  const handleChangeAdvert = (event) => {
    updateAdvert(event.target.name, event.target.value);
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

  const isDisabled = () => {
    return (!name || !sale || (price < 0) || (tags.length <= 0));
  }

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
        step={0.01}
        min={0} 
        required
        onChange={handleChangeAdvert}
      />
      {/* {tagsList.length ? <TagsList tags={tagsList} onChange={handleChangeCheckbox} required /> : <p>No hay tags disponibles</p>} */}
      {tagsList.length ? <TagsList tags={tagsList} onChange={handleChangeCheckbox} onChange={handleChangeCheckbox} required /> : <p>No hay tags disponibles</p>}
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
        disabled={isDisabled()}
      >
        Crear anuncio
      </Button>
    </form>
  );
};

export default NewAdvertForm;
