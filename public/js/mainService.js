    var main = angular.module('main', ['ngRoute', 'ngResource'])

    //---------------
    // Services
    //---------------

    main.factory('Stocks', ['$resource', function($resource){
      return $resource('/stocks/:id', null, {
        'update': { method: 'PUT' }
      });
    }])

    main.factory('TopVolumn', ['$resource', function($resource){
      return $resource('/stocks/topvolumn');
    }])

    main.factory('TopRate', ['$resource', function($resource){
      return $resource('/stocks/toprate');
    }])

    //---------------
    // Controllers
    //---------------

    main.controller('MainController', ['$scope', 'TopVolumn', 'TopRate', function ($scope, TopVolumn, TopRate) {
      $scope.topvstocks = TopVolumn.query();
      $scope.toprstocks = TopRate.query();
    }])

    //---------------
    // Routes
    //---------------

    main.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/stocklist.html',
          controller: 'MainController'
        })

        .when('/:id', {
          templateUrl: '/stockDetails.html',
          controller: 'MainController'
       });
    }]);