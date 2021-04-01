import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { getAllAdverts } from '../../../api/adverts';
import Layout from '../../layout/Layout';
import { Button } from '../../shared';
import './AdvertsPage.css';
import AdvertsList from './AdvertsList';

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>No hay anuncios para mostrar</p>
    <p>¿Quieres ser el primero? ;-)</p>
    <Button as={Link} to="/advert/new" variant="primary">
      Crear anuncio
    </Button>
  </div>
);

const AdvertsPage = ({ className, ...props }) => {
  const [adverts, setAdverts] = React.useState([]);

  React.useEffect(() => {
    getAllAdverts().then((adverts) => { 
      const newList = [];
      for (let index = 0; index < 8; index++) {
        adverts.forEach(element => {
          newList.push(element);
        });
      }
      setAdverts(newList);
    });
  }, []);

  return (
    <Layout title="NodeAnuncios" {...props}>
      {/* <div> */}
        {adverts.length ? <AdvertsList adverts={adverts} /> : <EmptyList />}
      {/* </div> */}
    </Layout>
  );
};

export default AdvertsPage;
