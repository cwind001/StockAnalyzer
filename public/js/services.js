  	var app = angular.module('app', ['ngRoute', 'ngResource'])

    //---------------
    // Services
    //---------------

    app.factory('Stocks', ['$resource', function($resource){
      return $resource('/manager/stockcodes/:id', null, {
        'update': { method: 'PUT' }
      });
    }])

    app.factory('StockPersister', ['$resource', function($resource){
      return $resource('/stocks/:id', null, {
        'update': { method: 'PUT' }
      });
    }])

    //---------------
    // Controllers
    //---------------

    app.controller('InitController', ['$scope', 'Stocks', 'StockPersister', '$q', function ($scope, Stocks, StockPersister) {
      $scope.initialize = function(){
        if(isNaN($scope.stockamount)){
          return;
        }
        var pageCount = $scope.stockamount / 20;
        for(var pageIndex=1; pageIndex<=pageCount; pageIndex++){
          var tmp = Stocks.query({id:pageIndex}).$promise.then(function(stocks){
            for(var i=0; i<stocks.length; i++){
              var tmpStk = JSON.parse(JSON.stringify(stocks[i]));
              var stock = new StockPersister(tmpStk);
              stock.$save();
            }
            $scope.result = '成功导入 ' + $scope.stockamount + ' 条股票数据！';
          });
        }
      };

    }])

    //---------------
    // Routes
    //---------------

    app.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/stocks.html',
          controller: 'InitController'
        });
    }]);

