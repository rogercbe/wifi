angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $cordovaDevice) {
  $scope.scan = function () {
    // WifiWizard.getCurrentSSID(ssidHandler, fail);
    // WifiWizard.getCurrentBSSID(bssidHandler, fail);
    $scope.uuid = $cordovaDevice.getUUID();

    var mac = '1223344556';
    $http.post('http://test.app/api/channel/join', {
      address: $scope.bssid,
      uuid: $scope.uuid,
    }).then(function(data) {
      $scope.data = data.data.status;
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
    console.log(error);
    $scope.data = error;
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
