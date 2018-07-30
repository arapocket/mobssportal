
var express = require('express');
var router = express.Router();

var LoginController = require('../controllers/LoginController');
var PortalController = require('../controllers/PortalController');
var IncidentController = require('../controllers/IncidentController');
var SuggestionController = require('../controllers/SuggestionController');

router.get('/', LoginController.renderHome);
router.get('/portal', LoginController.renderPortal);
router.post('/', LoginController.renderPortal);

router.get('/incident', PortalController.renderIncidentView);
router.get('/incident/:id', IncidentController.renderIncidentDetails);
router.put('/incident/:id', IncidentController.putIncident);
router.delete('/incident/:id/:username', IncidentController.deleteIncident)
router.post('/incident', IncidentController.postIncident);
router.get('/incidentlist', PortalController.renderIncidentListView);

router.get('/suggestion', PortalController.renderSuggestionView);
router.get('/suggestion/:id', SuggestionController.renderSuggestionDetails);
router.put('/suggestion/:id', SuggestionController.putSuggestion);
router.delete('/suggestion/:id/:username', SuggestionController.deleteSuggestion)
router.post('/suggestion', SuggestionController.postSuggestion);
router.get('/suggestionlist', PortalController.renderSuggestionListView);


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