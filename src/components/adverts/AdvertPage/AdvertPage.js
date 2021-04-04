import React from "react";
import Layout from "../../layout/Layout";

import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { getAdvert } from "../../../api/adverts";
import { Button, Loader } from "../../shared";
import "./AdvertPage.css";
import AdvertDetail from "./AdvertDetail";

const AdvertPage = ({ match, ...routeProps }) => {
  const [advert, setAdvert] = React.useState({});
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const handleSuccess = ({ ...advert }) => {
    // console.log("On handleSuccess", advert);
    // debugger;
    setAdvert(advert);
    // debugger;
    setLoading(false);
  };

  const handleError = ({ ...error }) => {
    // console.log("On handlError", error);
    // debugger;
    setError(error);
    // debugger;
    setLoading(false);
  };

  React.useEffect(async () => {
    // console.log("On useEffect");
    // console.log("On useEffect isloading", isLoading);
    // console.log("On useEffect advert", advert);
    // console.log("On useEffect error", error);
    try {
      const ad = await getAdvert(match.params.advertId);
      // debugger;
      handleSuccess(ad);
    } catch (error) {
      // debugger;
      handleError(error);
    }
  }, []);

  const children = () => {
    // console.log("On children");
    if (isLoading) {
      // console.log("On children isLoading", isLoading);
      // debugger;
      // return <div>Waiting</div>;
      return <Loader />
    } else if (error) {
      // console.log("On children error", advert);
      // debugger;
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
      // console.log("On children advert", advert);
      // debugger;
      return <AdvertDetail advert={advert} {...routeProps}/>;
    }
  };
  // console.log("On AdvertPage");
  // console.log("isloading", isLoading);
  // console.log("advert", advert);
  // console.log("error", error);
  // debugger;
  return <Layout title="Detalle de anuncio">{children()}</Layout>;
};

export default AdvertPage;
