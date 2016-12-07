import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

const baseUrl = "/ps";
const baseAuth = baseUrl + "/auth";
const wwwRoot = BASE_API_URL + baseAuth
const wwwPublicRoot = BASE_API_URL + baseUrl;

export const loginUrl     = wwwPublicRoot + '/login';
export const positionsUrl = wwwRoot + '/positions';
export const tripsUrl     = wwwRoot + '/trips';

ReactDOM.render(<App/>, document.getElementById('app'));
