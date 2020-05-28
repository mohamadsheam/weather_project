var app = angular.module("myApp", ['ngRoute']);

 // configure routing
app.config(function ($routeProvider) {
    $routeProvider
        .when("/",{
            templateUrl: "app/layout/main.htm"
        })
        .when("/about", {
            templateUrl: "app/layout/about.htm"
        })
        .otherwise({
            redirectTo: "/"
        });
});