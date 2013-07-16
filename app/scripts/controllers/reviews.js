BookCrossingApp.controller('ReviewsCtrl', function ($scope, $rootScope, dataService, $q) {

    var star = "styles/img/blankstar.png";
    var selectedStar = "styles/img/selectedstar.png";

    function like(reviewId, isLike)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();
        dataService.addLikeUnLikeToReview(reviewId, isLike, function (isSuccess, results) {

            $scope.$apply(function(){
                if(isSuccess)
                {
                    deferred.resolve(results);
                }
                else
                {
                    deferred.reject();
                }
            });

        });

        return deferred.promise;
    }
    function getReviewLikeByUser(userId, bookId)
    {

        var deferred = $q.defer();
        dataService.getReviewLike(userId, bookId, function (isSuccess, results) {

            $scope.$apply(function(){
                if(isSuccess)
                {
                    deferred.resolve(results);
                }
                else
                {
                    deferred.reject();
                }
            });

        });

        return deferred.promise;
    }

    function getReviews(bookId)
    {

        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();
        dataService.getReviewsFromBookId(bookId, function (isSuccess, results) {

            $scope.$apply(function(){
                if(isSuccess)
                {
                    deferred.resolve(results);
                }
                else
                {
                    deferred.reject();
                }
            });

        });

        return deferred.promise;

    }

    var promise = getReviews($scope.selectedBook.id)
    promise.then(function(bookReviews) {
        $scope.reviews = bookReviews;
        $rootScope.$broadcast(loadingRequestConst.Stop);
    }, function(reason) {

        $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
        $rootScope.MessageNotification = reason;
    });


    $scope.like  = function(review, isLike) {

        var promise = like(review.id, isLike)
        if(isLike)
        {
            review.increment("likeCount");
            $scope.LikeClicked=true;
            $scope.UnLikeClicked=false;
        }
        else
        {
            review.increment("unLikeCount");
            $scope.LikeClicked=false;
            $scope.UnLikeClicked=true;
        }
        promise.then(function(reviewLike) {

            $rootScope.$broadcast(loadingRequestConst.Stop);
            $scope.clicked = false;

        }, function(reason) {

            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = reason;
        });


    }

    $scope.nextPage  = function() {
        //TODO: Load Next Pages
    };
});
