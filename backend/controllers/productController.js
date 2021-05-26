exports.getProducts = (req, res, next) => {
	res.status(200).json({
		// respond when connect successfully with the api
		success: true,
		message: "This route will show all products in database.",
	});
};
