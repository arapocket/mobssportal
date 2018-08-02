
var express = require('express');
var router = express.Router();

var LoginController = require('../controllers/LoginController');
var PortalController = require('../controllers/PortalController');
var IncidentController = require('../controllers/IncidentController');
var SuggestionController = require('../controllers/SuggestionController');
var AppointmentController = require('../controllers/AppointmentController');
var UserController = require('../controllers/UserController');

router.get('/', LoginController.renderHome);
router.get('/portal', LoginController.renderPortal);
router.post('/', LoginController.renderPortal);

router.get('/incident', PortalController.renderIncidentView);
router.get('/incident/:id', IncidentController.renderIncidentDetails);
router.put('/incident/:id', IncidentController.putIncident);
router.delete('/incident/:id', IncidentController.deleteIncident)
router.post('/incident', IncidentController.postIncident);
router.get('/incidentlist', PortalController.renderIncidentListView);

router.get('/suggestion', PortalController.renderSuggestionView);
router.get('/suggestion/:id', SuggestionController.renderSuggestionDetails);
router.put('/suggestion/:id', SuggestionController.putSuggestion);
router.delete('/suggestion/:id', SuggestionController.deleteSuggestion)
router.post('/suggestion', SuggestionController.postSuggestion);
router.get('/suggestionlist', PortalController.renderSuggestionListView);

router.get('/appointment', PortalController.renderAppointmentView);
router.get('/appointment/:id', AppointmentController.renderAppointmentDetails);
router.put('/appointment/:id', AppointmentController.putAppointment);
router.delete('/appointment/:id', AppointmentController.deleteAppointment)
router.post('/appointment', AppointmentController.postAppointment);
router.get('/appointmentlist', PortalController.renderAppointmentListView);

router.get('/users', UserController.usersHome);
router.get('/userAdd', UserController.userAdd);
router.post('/userAdd', UserController.userAddToDb);
router.get('/userModify', UserController.userGetOne);
router.post('/userModify', UserController.userUpdateOne);
router.get('/userDelete', UserController.userGetOneForDelete);
router.post('/userDelete', UserController.userDeleteOne);


router.get('/logout', function (req, res) {
	// delete the session variable
	sess = req.session;
	console.log("logging out " + sess.username);
	delete sess.username;
	delete sess.success;
	delete sess.photoSuccess;
	delete sess.error;
	console.log("logged out " + sess.username);
	// redirect user to homepage
	res.redirect('/');
});

module.exports = router;