import React from "react";
import Layout from "../../layout/Layout";

import { Redirect } from "react-router";
import { getAdvert } from "../../../api/adverts";

import './AdvertPage.css';
import AdvertDetail from "./AdvertDetail";

// class TweetDetailPage extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       tweet: null,
//       error: null,
//     };
//   }

//   componentDidMount() {
//     const { match } = this.props;
//     getTweetDetail(match.params.tweetId)
//       .then(tweet => this.setState({ tweet }))
//       .catch(error => this.setState({ error }));
//   }

//   render() {
//     const { tweet, error } = this.state;
//     if (error && error.status === 404) {
//       return <Redirect to="/404" />;
//     }
//     return (
//       <Layout title="Tweet Detail" {...this.props}>
//         <div>{JSON.stringify(tweet)}</div>
//       </Layout>
//     );
//   }
// }

const AdvertPage = ({ match, ...routeProps }) => {
  const [advert, setAdvert] = React.useState(null);
  const [error, setError] = React.useState(null);

  const resetError = () => setError(null);

  React.useEffect(() => {
    getAdvert(match.params.advertId)
    // getAdvert(1)
    .then(advert => { console.log(advert); setAdvert(advert)})
    .catch(setError);
  },[]);

  return (
    <Layout title="Detalle de anuncio">
      {error && (
        <div onClick={resetError} className="advertPage-error">
          {error.message}
        </div>
      )}
      {/* <div>{JSON.stringify(advert)}</div> */}
      <AdvertDetail advert={advert}/>
    </Layout>
  );
};

export default AdvertPage;
