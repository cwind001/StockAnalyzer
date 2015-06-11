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

    app.factory('Recommends', ['$resource', function($resource){
      return $resource('/recommends/:id', null, {
        'update': { method: 'PUT' }
      });
    }])

    //---------------
    // Controllers
    //---------------

    app.controller('InitController', ['$scope', 'Stocks', 'StockPersister', 'Recommends', '$q', 
      function ($scope, Stocks, StockPersister, Recommends) {
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

      $scope.genRecommends = function() {
        var rcmds = [{"keyword":"银行", "code":"601988", "name":"中国银行", "newest":5.15, "offset":-0.14, 
          "offrate":-2.65, "open":5.15,"close":5.29, "confidencescore":99},
          {"keyword":"银行", "code":"601398", "name":"工商银行", "newest":5.43, "offset":-0.09, 
          "offrate":-1.63, "open":5.44,"close":5.52, "confidencescore":89},
          {"keyword":"银行", "code":"601288", "name":"农业银行", "newest":3.99, "offset":-0.05, 
          "offrate":-1.24, "open":4.00, "close":4.04, "confidencescore":79},
          {"keyword":"航空", "code":"600115", "name":"东方航空", "newest":11.90, "offset":0.74, 
          "offrate":6.63, "open":10.90,"close":11.16, "confidencescore":88},
          {"keyword":"航空", "code":"600221", "name":"海南航空", "newest":6.57, "offset":0.14, 
          "offrate":2.18, "open":6.23, "close":6.43, "confidencescore":68}];
          rcmds = JSON.parse(JSON.stringify(rcmds));
        for(var i=0; i<rcmds.length; i++) {
          var rc = new Recommends(rcmds[i]);
          rc.$save();
        }
        $scope.result = '今日股票推荐已生成成功！';
      }
    }])

    //---------------
    // Routes
    //---------------

    app.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/manager.html',
          controller: 'InitController'
        });
    }]);

    

