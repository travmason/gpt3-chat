import {Redirect, Route} from 'react-router-dom';
//import {Header, Shell, Footer} from 'react';
import { isLoggedIn } from './SessionLogic'

function Unauthed ({component: Component, hasFooterHeader, ...rest}) {
  const authed = isLoggedIn();
  let page = null;
  if (hasFooterHeader) {
    page = (
      <div>
          <Component {...rest} />
      </div>
    );
  } else {
    page = <Component {...rest} />;
  }
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? page
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

export default Unauthed;