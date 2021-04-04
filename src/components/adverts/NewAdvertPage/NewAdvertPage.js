import React from 'react';
import './NewAdvertPage.css';
import Layout from '../../layout/Layout';

import './NewAdvertPage.css';

import NewAdvertForm from './NewAdvertForm';

const NewAdvertPage = props => {
  const [error, setError] = React.useState(null);
  const [createdAdvert, setCreatedAdvert] = React.useState(null);


    const handleSubmit = (event) => {
        console.log('on handleSubmit new advert page', event);
    };
    

  return (
    <Layout title="Crea un nuevo anuncio" {...props}>
      <div className="newAdvertPage" style={{ borderBottomWidth: 10 }}>
          <NewAdvertForm onSubmit={handleSubmit} />
          {/* En página para crear un anuncio */}
      </div>
    </Layout>
  );
};

export default NewAdvertPage;
