const express = require('express');
const cars = require('../components/cars/network');
const routes = function (server) {
    server.use('/api/v1/cars', cars);
}

module.exports = routes;