
var express = require('express');
var router = express.Router();

var LoginController = require('../controllers/LoginController');
var PortalController = require('../controllers/PortalController');
var WorkOrderController = require('../controllers/WorkOrderController');
router.get('/', LoginController.renderHome);
router.get('/portal', LoginController.renderPortal);
router.post('/', LoginController.renderPortal);
router.get('/newworkorder', PortalController.renderNewWorkOrderView);
router.post('/newworkorder', WorkOrderController.postWorkOrder);

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