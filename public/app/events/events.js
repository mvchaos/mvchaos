angular.module('booletin.events',[])

.controller('EventController', function($scope, Events, $state, $firebaseArray){
  console.log('event controller activate');
  var dbConnection = new Firebase("https://booletin.firebaseio.com/events");
  // $scope.events = $firebaseArray(dbConnection);
    $scope.events = Events.events;
  // console.log($scope.events);
  Events.targetZipsString = "all";

  $scope.targetZipsString = Events.targetZipsString;
  $scope.queryZip = {};
  $scope.validZip = false;
  // $scope.events = {};
  $scope.getEvents = function (){
    Events.queryLocation($scope.queryZip)
      .then(function (response){
        Events.targetZips = [];
        Events.targetZipsString = "";
        Events.lastLookup = $scope.queryZip.zipcode;
        for (var i = 0; i < response.data[0].zip_codes.length; i++) {
          Events.targetZips.push(response.data[0].zip_codes[i].zip_code);
          Events.targetZipsString += (response.data[0].zip_codes[i].zip_code + ", ");
        }
        Events.targetZipsString = Events.targetZipsString.slice(0, Events.targetZipsString.length - 2);
      })
      .then(function(){
        //query db for all zip codes
        Events.events = [];

        for(var j = 0; j < Events.targetZips.length; j++){
          // console.log(Events.targetZips[j])
          dbConnection.orderByChild('zipCode').equalTo(Events.targetZips[j]).on('value', function(snap){
            // console.log(snap.val());
            var dbRes = snap.val();
            console.log("db res ",dbRes);
            if(dbRes !== null){
              for(var key in dbRes){
                console.log('adding to events list');
                // $scope.events.push(dbRes[key]);
                Events.events.push(dbRes[key]);
                // console.log('cur events ', $scope.events);
              }
            }
          }, function(errObj){
            console.log("failed ", errObj.code);
          });
        }

      })
      .then(function(){
        // navigate to events view
        setTimeout(function(){
          console.log('cur events ', Events.events);
          $state.go('events');
        }, 2000);
      })
      .catch(function(error){
        $scope.invalidZip = true;
      });
  };
  console.log("Saved Lookup", Events.lastLookup);
  console.log("Target Zips", Events.targetZips);
  console.log("Target Zips List", Events.targetZipsString);
});