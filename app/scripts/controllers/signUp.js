'use strict';

BookCrossingApp.controller('SignUpCtrl', function ($scope, dataService, $location) {
    $scope.registerNewUser = function (user) {

        dataService.registerNewUser(user, function (isResult, result) {

            $scope.$apply(function () {
                if (isResult)
                {
                    $location.path('/SignUpDetails');
                }
                else
                {
                    $scope.ErrorMessage = result.message;
                }
            });
        });

    };
    $scope.signUpFb = function()
    {
        dataService.signInFb(function(result)
        {
            $scope.$apply(function () {
                if(result)
                {
                    $location.path('/Main');
                }
                else
                {
                    $rootScope.ErrorMessage = "User has not accepted the conditions";
                }
            });

        });
    };
});
