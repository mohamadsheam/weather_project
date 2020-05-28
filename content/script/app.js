var app = angular.module("myApp", ['ngRoute']);

 // configure routing
app.config(function ($routeProvider) {
    $routeProvider
        .when("/",{
            templateUrl: "app/layout/main.htm",
            controller: 'searchWeatherCtrl'
        })
        .when("/about", {
            templateUrl: "app/layout/about.htm"
        })
        .otherwise({
            redirectTo: "/"
        });
});

// custom value
app.value("url", "http://api.openweathermap.org/data/2.5/");
app.value("apiKey", "2494191432201fa79cd1cc06ebeb0139");

// weather Search Controller
app.controller("searchWeatherCtrl", ["$scope", "$http", "url", "apiKey", function ($scope, $http, url, apiKey) {
    //console.log(url);
    //console.log(apiKey);
    $scope.loader = false;
    $scope.fetchData = function(city){
        $scope.loader = true;
        $scope.data = {};
        // build url weather?q={city name}&appid={your api key}
        var api = url + "weather?q=" + city + "&appid="+apiKey ;
        $http({
            method: "GET",
            url : api
        }).then(function (response) {
            $scope.loader = false;
            $scope.data.city = city;
            $scope.data.status = response.status;

            $scope.data.temp = (response.data.main.temp - 273.15).toFixed(1);
            $scope.data.weather_main = response.data.weather[0].main;
            $scope.data.weather_desc = response.data.weather[0].description;
            $scope.data.weather_icon = response.data.weather[0].icon;

            $scope.data.wind = response.data.wind.speed;
            $scope.data.pressure = response.data.main.pressure;
            $scope.data.humidity = response.data.main.humidity;

            $scope.data.country = response.data.sys.country;
            $scope.data.sunrise = formatTime(response.data.sys.sunrise * 1000);
            $scope.data.sunset = formatTime(response.data.sys.sunset * 1000);
            $scope.data.currentTime = formatTime(new Date);

            //console.log($scope.data);
        }, function (reject) {
            $scope.loader = false;
            $scope.data = reject.data;
        });

        // time conversion
        function formatTime(timeStamp) {

            var date = new Date(timeStamp);
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var format = (date.getHours() >= 12) ? "PM" : "AM";
            var hours = (date.getHours() >= 12) ? date.getHours()-12 : date.getHours();
            return( hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) +' ' + format );
        }

        // empty search field
        $scope.city = '';

    }
}]);