module.exports = function($routeProvider) {
	$routeProvider
	.when('', {
		template: require('./views/index.html'),
		controller: require('./controllers/mainController')
	})
	.when('/', {
		template: require('./views/index.html'),
		controller: require('./controllers/mainController')
	})
	.when('/about', {
		template: require('./views/about.html'),
		controller: require('./controllers/aboutController')
	});
}