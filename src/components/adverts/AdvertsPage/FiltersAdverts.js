import React from "react";
import { Button } from "../../shared";
import FormField from "../../shared/FormField";
import { getAllTags } from '../../../api/adverts';

const TagsList = (tags) => {
  const { onChange, onChecked } = { ...tags};

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
              checked={onChecked(tag)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const FiltersAdverts = ({
  className,
  handleFilters,
  handleCloseFilters,
  ...props
}) => {
  const [isFiltersDisplay, setFiltersDisplay] = React.useState(false);
  const [tagsList, setTagsList] = React.useState([]);
  const [filters, setFilters] = React.useState({
    name: "",
    sale: "",
    minPrice: 0,
    maxPrice: 0,
    tags: [],
  });

  const changeIsFiltersDisplay = () => setFiltersDisplay(!isFiltersDisplay);
  const cleanFilters = () => {
    const emptyFilters = {
      name: "",
      sale: "",
      minPrice: 0,
      maxPrice: 0,
      tags: [],
    }
    setFilters(emptyFilters);
    handleCloseFilters();
  };

  const cleanCloseFilters = () => {
    changeIsFiltersDisplay();
    cleanFilters();
    handleCloseFilters();
  };

  const updateFilters = (name, value) => {

    setFilters((oldFilters) => {
      const newFilters = {
        ...oldFilters,
        [name]: value
      };
      return newFilters;
    });
  };

  const handleChangeFilters = (event) => {
    updateFilters(event.target.name, event.target.value);
  };

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
    updateFilters(event.target.name, newTags);
  };

  const handleCheckedcheckbox = (key) => tags.includes(key);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFilters(filters);
  };

  React.useEffect(async () => {
    try {
      const listTags = await getAllTags();
      setTagsList(listTags);
    } catch (error) {
      console.log(error.error);
    }
  }, []);

  const { name, sale, minPrice, maxPrice, tags } = { ...filters };

  return (
    <div>
      {isFiltersDisplay && (
        <form className="filtersForm-form" onSubmit={handleSubmit}>
          <FormField
            type="text"
            name="name"
            label="Artículo"
            id="name"
            className="nameFilterForm-field"
            value={name}
            onChange={handleChangeFilters}
          />
          <div className="saleFiltersForm-container">
            <p className="saleFiltersForm-container-title">Elija una opción</p>
            <FormField
              type="radio"
              name="sale"
              label="Se vende"
              className="saleFiltersForm-field"
              value="true"
              id="true"
              onChange={handleChangeFilters}
              checked={"true" == sale}
            />
            <FormField
              type="radio"
              name="sale"
              label="Se compra"
              className="saleFiltersForm-field"
              value="false"
              id="false"
              onChange={handleChangeFilters}
              checked={"false" == sale}
            />
            <FormField
              type="radio"
              name="sale"
              label="Se vende o se compra"
              className="saleFiltersForm-field"
              value="all"
              id="all"
              onChange={handleChangeFilters}
              checked={"all" == sale}
            />
          </div>
          <div>
            <FormField
              type="number"
              name="minPrice"
              label="Precio mínimo €"
              className="priceFiltersForm-field"
              value={minPrice}
              step={0.01}
              min={0}
              onChange={handleChangeFilters}
            />
            <FormField
              type="number"
              name="maxPrice"
              label="Precio máximo €"
              className="priceFiltersForm-field"
              value={maxPrice}
              step={0.01}
              min={0}
              onChange={handleChangeFilters}
            />
          </div>
          {tagsList.length ? <TagsList tags={tagsList} onChange={handleChangeCheckbox} onChecked={handleCheckedcheckbox} /> : <p>No hay tags disponibles</p>}
          <Button
            type="submit"
            className="filtersForm-submit"
            variant="primary"
          >
            Filtrar
          </Button>
        </form>
      )}
      {isFiltersDisplay ? (
        <div>
          <Button className="filters-button" onClick={cleanFilters}>
            Borrar Filtros
          </Button>
          <Button className="filters-button" onClick={cleanCloseFilters}>
            Cerrar Filtros
          </Button>
        </div>
      ) : (
        <Button className="filters-button" onClick={changeIsFiltersDisplay}>
          {" "}
          Mostrar Filtros
        </Button>
      )}
    </div>
  );
};

export default FiltersAdverts;
