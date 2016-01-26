require('angular')


var app = angular
			.module('app', [require('angular-route')])
			.config(require('./router.js'));