const express = require('express');

const usuarioController = require('./controllers/usuarioController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();  

routes.post('/sessions', SessionController.create); 

routes.get('/usuario', usuarioController.index );
routes.post('/usuario', usuarioController.create );

routes.get('/profile', profileController.index); 

routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;