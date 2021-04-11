import React from "react";
import "./NewAdvertPage.css";
import Layout from "../../layout/Layout";

import "./NewAdvertPage.css";

import NewAdvertForm from "./NewAdvertForm";
import { createAdvert } from "../../../api/adverts";
import { Redirect } from "react-router";

const NewAdvertPage = (props) => {
  const [error, setError] = React.useState(null);
  const [createdAdvert, setCreatedAdvert] = React.useState(null);

  const closeErrorMessage = () => {
    setError(null);
  }

  const handleSubmit = async (newAdvert) => {
    try {
      const advert = await createAdvert(newAdvert);
      setCreatedAdvert(advert);
    } catch (error) {
      setError(error);
    }
  };
  
  if (error && error.status === 401) {
    return <Redirect to="/login" />;
  }
  
  if (createdAdvert) {
    return <Redirect to={`/advert/${createdAdvert.id}`} />;
  }

  return (
    <Layout title="Crea un nuevo anuncio" {...props}>
      <div className="newAdvertPage-main-container">
         {error && <div onClick={closeErrorMessage}>
          <div className="newAdvertPage-error">{error.message}</div>
        </div>}
       <div className="newAdvertPage" style={{ borderBottomWidth: 10 }}>
         <NewAdvertForm onSubmit={handleSubmit} /> 
       </div> 
      </div>
    </Layout>
  );
};

export default NewAdvertPage;
