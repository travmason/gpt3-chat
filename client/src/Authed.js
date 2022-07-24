import {Redirect, Route} from 'react-router-dom';
import React from 'react';
import {Header, Shell, Footer} from 'react';
import { isLoggedIn, isLoggedJWTPoll } from './SessionLogic'

function Authed ({component: Component, hasFooterHeader, ...rest}) {
  const authed = isLoggedIn();
  let page = null;
  if (hasFooterHeader) {
    page = (
      <div>
        <Header />
        <Shell>
          <Component {...rest} />
        </Shell>
        <Footer />
      </div>
    );
  } else {
    page = <Component {...rest} />;
  }
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? page
        : (isLoggedJWTPoll()
          ? page
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />)}
    />
  )
}

export default Authed;