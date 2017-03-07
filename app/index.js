// import the dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/layout/component/layout';
import Map from './components/map/component/map';
import './public/css/style.scss';

ReactDOM.render(
  <div>
    <Layout />
    <Map />
  </div>,
  document.getElementById('root'),
);
