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
    photo: null
  });
  const [tagsList, setTagsList] = React.useState([]);

  const updateAdvert = (name, value) => {
    setAdvert((oldAdvert) => {
      const newAdvert = {
        ...oldAdvert,
        [name]: value
      };
      return newAdvert;
    });
  }

  const handleChangeCheckbox = (event) => {
    const newTags = tags.slice();
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
    event.target.name == "photo" ? 
    updateAdvert(event.target.name, event.target.files[0]) :
    updateAdvert(event.target.name, event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(advert);
  };

  React.useEffect(async () => {
    try {
      const listTags = await getAllTags();
      setTagsList(listTags);
    } catch (error) {
      console.log(error.error);
    }
  }, []);

  const { name, sale, price, tags, photo } = { ...advert };

  const isDisabled = () => {
    const nameTrim = name.trim();
    return ((nameTrim.length == 0) || !sale || (price < 0) || (tags.length <= 0));
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
      {tagsList.length ? <TagsList tags={tagsList} onChange={handleChangeCheckbox} onChange={handleChangeCheckbox} required /> : <p>No hay tags disponibles</p>}
      <FormField
        type="file"
        name="photo"
        label="Imagen del artículo"
        id="photo"
        className="photoAdvertForm-field"
        accept="image/*"
        onChange={handleChangeAdvert}
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
