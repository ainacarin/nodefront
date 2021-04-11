import React from "react";
import Layout from "../../layout/Layout";

import { Link } from "react-router-dom";
import { getAdvert } from "../../../api/adverts";
import { Button, Loader } from "../../shared";
import "./AdvertPage.css";
import AdvertDetail from "./AdvertDetail";

const AdvertPage = ({ match, ...routeProps }) => {
  const [advert, setAdvert] = React.useState({});
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const handleSuccess = ({ ...advert }) => {
    setAdvert(advert);
    setLoading(false);
  };

  const handleError = ({ ...error }) => {
    setError(error);
    setLoading(false);
  };

  React.useEffect(async () => {
    try {
      const ad = await getAdvert(match.params.advertId);
      handleSuccess(ad);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const children = () => {
    if (isLoading) {
      return <Loader />
    } else if (error) {
      return (
        <div>
          <div className="advertPage-error">{error.error}</div>
          <div className="advertPage-error-button">
            <Button as={Link} to="/adverts" variant="primary">
              Volver a NodeAnuncios
            </Button>
          </div>
        </div>
      );
    } else if (!!advert) {
      return <AdvertDetail advert={advert} {...routeProps}/>;
    }
  };
  return <Layout title="Detalle de anuncio">{children()}</Layout>;
};

export default AdvertPage;
