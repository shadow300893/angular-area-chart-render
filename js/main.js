/**
 * Main AngularJS Web Application
 */
var app = angular.module('dataVisualizationWebApp', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html"})
    // Pages
    .when("/chart/:name", {templateUrl: "partials/chart.html"})
    .otherwise({templateUrl: "partials/404.html"});
}]);