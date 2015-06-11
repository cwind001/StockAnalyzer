    var main = angular.module('main', ['ngRoute', 'ngResource'])

    //---------------
    // Services
    //---------------

    main.factory('Stocks', ['$resource', function($resource){
      return $resource('/stocks/:id', null, {
        'update': { method:'PUT' }
      });
    }])

    main.factory('TopVolumn', ['$resource', function($resource){
      return $resource('/stocks/topvolumn');
    }])

    main.factory('TopRate', ['$resource', function($resource){
      return $resource('/stocks/toprate');
    }])

    main.factory('Holdings', ['$resource', function($resource){
      return $resource('/holdings/:id', null, {
        'update': { method: 'PUT' }
      });
    }])

    main.factory('Recommends', ['$resource', function($resource){
      return $resource('/recommends/:id', null, {
        'update': { method: 'PUT' }
      });
    }])

    //---------------
    // Controllers
    //---------------

    main.controller('MainController', ['$scope', 'TopVolumn', 'TopRate', function ($scope, TopVolumn, TopRate) {
      $scope.topvstocks = TopVolumn.query();
      $scope.toprstocks = TopRate.query();
    }])

    main.controller('StockDetailCtrl', ['$scope', '$routeParams', 'Stocks', 'Holdings', '$location', 
      function ($scope, $routeParams, Stocks, Holdings, $location) {
        $scope.stkdetail = Stocks.get({id: $routeParams.id});
        $scope.scount = 0;
        $scope.comeback = function(){
          console.log('func come back is called');
          $location.url('/');
        };
        $scope.displaybuy = function(){
          $scope.showbuy = true;
        };
        $scope.confirmbuy = function(){
          var tmpHolding = {"name":$scope.stkdetail.name,"code":$scope.stkdetail.code,"newest":$scope.stkdetail.newest,
            "amount":$scope.scount};
          var th = new Holdings(tmpHolding);
          th.$save();
          $scope.showbuy = false;
        }
    }])

    main.controller('HoldingCtrl', ['$scope', 'Holdings', function ($scope, Holdings) {
        $scope.holdings = Holdings.query();
        $scope.piedata = [{name:"南方航空",y:1260},{name:"紫金矿业",y:985.5},{name:"北京银行",y:12843.5},
                          {name:"中国铝业",y:5285},{name:"中国石化",y:5285},{name:"中国银行",y:529}];
    }])

    main.controller('RecommendCtrl', ['$scope', 'Recommends', function ($scope, Recommends) {
        $scope.keyword1 = '银行';
        $scope.keyword2 = '航空';
        $scope.recommendslist = Recommends.query();
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
       .when('/holdings',{
          templateUrl: '/holdings.html',
          controller: 'HoldingCtrl'
       })
       .when('/recommends', {
          templateUrl: '/recommends.html',
          controller: 'RecommendCtrl'
       })
       .when('/:id', {
          templateUrl: '/stockDetails.html',
          controller: 'StockDetailCtrl'
       });
    }]);