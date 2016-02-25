angular.module('booletin.add',[])

.controller('addEvents',function ($scope, $firebaseArray, $firebaseObject, $state, $http){
  var dbConnection = new Firebase("https://glowing-torch-8522.firebaseio.com"); //https://booletin.firebaseio.com/events
  $scope.events = $firebaseArray(dbConnection);
  $scope.newEvent = {
    photo: ""
  };
  var today = new Date();
  $scope.today = today.toISOString();
  $scope.getImage = function(){
    var files = document.getElementById('fileInput').files;
    var file = files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
      var list = document.getElementsByClassName('preview');
      for (var i = 0; i < list.length; i++) {
        list[i].setAttribute('src', reader.result);
      }
      $scope.newEvent.photo = reader.result;
    }
    reader.readAsDataURL(file);
  };

  $scope.addEvent = function(){
    $scope.events.$add({
      zipCode : $scope.newEvent.zipCode,
      eventName : $scope.newEvent.eventName,
      streetAddress : $scope.newEvent.streetAddress,
      eventDescription : $scope.newEvent.eventDescription,
      startDate : $scope.newEvent.startDate.toString().slice(0, 15),
      time : $scope.newEvent.time.toString().slice(15, 21) + ' ' + $scope.newEvent.time.toString().slice(35, 38),
      photo : $scope.newEvent.photo,
      tags : $scope.newEvent.tag
    });
    $state.go('events', {search:"no"});
  }

  $scope.getLocation = function(val) {
    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(response){
        $scope.newEvent.zipCode = response.data.results[0].address_components[7].long_name;
      return response.data.results.map(function(item){
        return item.formatted_address;
      });
    });
  };

});