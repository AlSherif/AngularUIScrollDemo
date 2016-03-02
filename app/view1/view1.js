'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope',function($scope) {

    var randomString = function(maxLength) {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
      var string_length = Math.floor(Math.random() * maxLength);
      var randomstring = '';
      for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
      }
      return randomstring;
    };

    var randomNumber = function(max)
    {
      var rnum = Math.floor(Math.random() * max);
      return rnum;
    };

    $scope.list = [];
    for(var i = 0; i<3000; i++)
    {
      var date = new Date();
      date.month--;
      date.day = randomNumber(30);
      var user =
      {
        name : randomString(9),
        firstName : randomString(9),
        address : randomString(9)+', '+randomString(6)+' '+randomNumber(6),
        subscribed : ((randomNumber(10) >= 5)? true:false),
        subscriptionDate : date
      };
      $scope.list.push(user);
    }

    $scope.viewSource =
    {
      get : function(index, count, success)
      {
        console.log('viewsource raw get i: '+index+' c: '+count);
        index--;
        if(index < 0)
        {
          count = count + index;
          index = 0;
        }
        count = index +count;

        console.log('viewsource  get slice i: '+index+' c: '+count);
        var viewData =  $scope.list.slice(index, count);

        success(viewData);
      }
      //minIndex : 0,
      //maxIndex : $scope.list.length
    };

    $scope.init = function()
    {

      if($scope.uiScrollAdapter)
      {
        $scope.uiScrollAdapter.refresh();
      }else
      {
        console.error('adapter not found!');
      }
    }

}]);