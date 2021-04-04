import React from "react";
import { Button } from "../../shared";
import FormField from "../../shared/FormField";
import "./NewAdvertForm.css";

const NewAdvertForm = ({ onSubmit }) => {
  const [advert, setAdvert] = React.useState({
    name: "",
    sale: "",
    price: 0,
    tags: [],
    photo: "",
  });

  const handleChangeAdvert = (event) => {
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
    onSubmit(advert);
  };

  const { name, sale, price, tags, photo } = { ...advert };
  return (
    <form className="newAdvertForm" onSubmit={handleSubmit}>
      <FormField
        type="text"
        name="name"
        label="name"
        className="nameAdvertForm-field"
        value={name}
        required
        onChange={handleChangeAdvert}
      />
      <div required>
        <FormField
          type="radio"
          name="sale"
          label="sale-true"
          className="saleAdvertForm-field"
          value="Se vende"
          id="true"
          onChange={handleChangeAdvert}
        />
        <FormField
          type="radio"
          name="sale"
          label="sale-false"
          className="saleAdvertForm-field"
          value="Se compra"
          id="false"
          onChange={handleChangeAdvert}
        />
      </div>
      <FormField
        type="number"
        name="price"
        label="price"
        className="priceAdvertForm-field"
        value={price}
        step="0.01" 
        min="0.00"
        required
        onChange={handleChangeAdvert}
      />
      <div className="tagsAdvertForm-field">tags</div>
      <Button
        type="submit"
        className="newAdvertPage-submit"
        variant="primary"
        disabled={true}
      >
        Crear anuncio
      </Button>
    </form>
  );
};

export default NewAdvertForm;
