import React from "react";
import { Button } from "../../shared";
import FormField from "../../shared/FormField";

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

const FiltersAdverts = ({
  className,
  handleFilters,
  handleCloseFilters,
  ...props
}) => {
  const [isFiltersDisplay, setFiltersDisplay] = React.useState(false);
  const [name, setName] = React.useState("");
  const [sale, setSale] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [tags, setTags] = React.useState([]);

  const changeIsFiltersDisplay = () => setFiltersDisplay(!isFiltersDisplay);
  const cleanFilters = () => {
    setName("");
    handleCloseFilters();
  }
 
  const cleanCloseFilters = () => {
    changeIsFiltersDisplay();
    cleanFilters();
    handleCloseFilters();
  };
  const handleName = (event) => {
      setName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
      console.log('handle submit ', name);
      const nameLowerCase = name.toLowerCase();
    handleFilters(nameLowerCase);
  };
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
            required
            onChange={handleName}
          />
          <p>nombre</p>
          <p>nombre</p>
          <p>nombre</p>
          <p>nombre</p>
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
