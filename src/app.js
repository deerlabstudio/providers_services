const express = require('express');

/** Express App */
const app = express();

/** Middlewares */
const errorHandler = require('./middlewares/error-handler');

/** controllers */
const HealthCheckController = require('./controllers/HealthCheck');
const ProvidersController = require('./controllers/Providers');
const ProvidersAddressController = require('./controllers/ProvidersAddress');

app.use(express.json());
app.use(new HealthCheckController(express.Router()).router);
app.use(new ProvidersController(express.Router()).router);
app.use(new ProvidersAddressController(express.Router()).router);
app.use(errorHandler());

module.exports = app;
