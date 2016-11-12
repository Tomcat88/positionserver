import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

const wwwRoot = 'http://localhost:8081'

export const positionsUrl = wwwRoot + '/positions';
export const tripsUrl     = wwwRoot + '/trips';

ReactDOM.render(<App/>, document.getElementById('app'));
