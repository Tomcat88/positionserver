import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

const wwwRoot = 'http://localhost:8081'

export const positionsUrl      = wwwRoot + '/:trip/positions.json';
export const tripsUrl          = wwwRoot + '/trips.json';
export const addPositionUrl    = wwwRoot + '/position/add';
export const deletePositionUrl = wwwRoot + '/position/delete';
export const addTripUrl        = wwwRoot + '/trip/add';

ReactDOM.render(<App/>, document.getElementById('app'));
