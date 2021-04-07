import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { getAllAdverts } from "../../../api/adverts";
import Layout from "../../layout/Layout";
import { Button, Loader } from "../../shared";
import "./AdvertsPage.css";
import AdvertsList from "./AdvertsList";

const EmptyList = () => (
  <div style={{ textAlign: "center" }}>
    <p>No hay anuncios para mostrar</p>
  </div>
);

const AdvertsPage = ({ className, ...props }) => {
  const [advertsList, setAdverts] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const handleSuccess = ( advertsList ) => {
    setAdverts(advertsList);
    setLoading(false);
  };

  const handleError = ({ ...error }) => {
    setError(error);
    setLoading(false);
  };

  const children = () => {
    if (isLoading) {
      return <Loader />;
    } else if (error) {
      return (
        <div>
          <div className="advertPage-error">{error.message}</div>
        </div>
      );
    } else if (advertsList.length) {
      return (
        <AdvertsList advertsList={advertsList} ></AdvertsList>);
    } else {
      return <EmptyList />;
    }
  };

  React.useEffect(async () => {
    try {
      const advertsList = await getAllAdverts();
      handleSuccess(advertsList);
    } catch (error) {
      handleError(error);
    }
  }, []);

  return (
    <Layout title="NodeAnuncios" {...props}>
      {children()}
    </Layout>
  );
};

export default AdvertsPage;
