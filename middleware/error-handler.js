// Error Handler
module.exports = (err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
		statusCode: err.status,
		message: err.message,
		error: {},
		t: res.__
	});
};