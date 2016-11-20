import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

const baseUrl = "/ps";
const wwwRoot = 'http://localhost:8081' + baseUrl;

export const positionsUrl = wwwRoot + '/positions';
export const tripsUrl     = wwwRoot + '/trips';

ReactDOM.render(<App/>, document.getElementById('app'));
