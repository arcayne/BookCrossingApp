'use strict';

BookCrossingApp.controller('HuntBookCtrl', function ($scope,dataService,$rootScope) {
    $scope.books = null;
    $scope.huntBook = function (book) {
        //$scope.$apply(function () {
                dataService.huntBook(book.registrationId,function(isSuccess,bookId)
                {
                    if(isSuccess)
                    {
                        //$rootScope.
                        $scope.selectedBook = bookId;
                        $scope.goTo('views/book.html');
                    }
                    else
                    {
                        $rootScope.ErrorMessage = "Oops . . . Please try to hunt it again in a few seconds.";
                    }
                });
        //});
    };


    dataService.getBooksThatCanBeReleased(function (isSuccess, results) {
        if(isSuccess)
        {
            $scope.$apply(function () {
                $scope.books = results
            });
        }
    });


    $scope.release = function (bookId) {
        //Go to releaseBook view
        $scope.selectedBook = bookId;
        $scope.goTo('views/releaseBook.html');
    };
});
