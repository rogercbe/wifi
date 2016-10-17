angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $cordovaDevice, $q, $ionicPush) {

  $scope.token = function() {
    $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
      console.log('Token saved:', t.token);
      $scope.token_msg = t.token;
    });
  }

  $scope.scan = function () {

    $q.when(WifiWizard.getCurrentSSID(ssidHandler, fail)).then(function() {
      $q.when(WifiWizard.getCurrentBSSID(bssidHandler, fail)).then(function() {
        $scope.uuid = $cordovaDevice.getUUID();

        $http.post('https://infinite-sands-50357.herokuapp.com/api/channel/join', {
          address: $scope.bssid,
          uuid: $scope.uuid,
        }).then(function(data) {
          $scope.data = data.data.status;
        });
      });
    });
  }

  function ssidHandler(data) {
    console.log(data);
    $scope.ssid = data;
  }

  function bssidHandler(data) {
    console.log(data);
    $scope.bssid = data;
  }

  function fail(error) {
    $scope.uuid = $cordovaDevice.getUUID();
    console.log(error);
    $scope.data = error;
    $http.post('https://infinite-sands-50357.herokuapp.com/api/channel/leave', {
          uuid: $scope.uuid,
        }).then(function(data) {
          $scope.data = data.data.status;
        });
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
