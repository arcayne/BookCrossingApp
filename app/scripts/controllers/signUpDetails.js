'use strict';

angular.module('BookCrossingApp')
  .controller('SignUpDetailsCtrl', function ($scope, dataService, $location) {

        $scope.updateUserProfile = function (user) {

<<<<<<< HEAD
            dataService.updateUserProfile(user, function (isResult, result) {
=======
            //Only way I found to fix this issue - SO question
            user.myPicture =  $scope.myPicture;

            DataService.updateUserProfile(user, function (isResult, result) {
>>>>>>> origin/Arcayne--Branch

                $scope.$apply(function () {
                    if (isResult)
                    {
                        $location.path('/Main');
                    }
                    else
                    {
                        $scope.ErrorMessage = result.message;
                    }
                });
            });
        }

        //Initialize default value
        $scope.myPicture = "../styles/img/CustomAvatarContest.png";

        $scope.$watch('myPicture', function(value) {
            if(value) {
                $scope.myPicture = value;
            }
        }, true);

});
