'use strict';

BookCrossingApp.factory('geolocationService', function ($rootScope, $http, phonegapReadyService, $q) {

        var getCityFromGeoPoint = function getCityFromGeoPoint(latitude, longitude){

            var deferred = $q.defer();
            var queryFormat;
            var url = 'http://maps.googleapis.com/maps/api/geocode/json';

            $http({
                method: 'GET',
                url: url,
                params: {latlng: latitude+","+longitude, sensor:true},
                cache: false
            }).
                success(function(data, status) {

                    if(data.status === "OK")
                    {
                       deferred.resolve(data.results[1].formatted_address);
                    }
                    else
                    {
                        deferred.reject(ErrorConst.CityNotFound)
                    }

                }).
                error(function(data, status) {

                    deferred.reject(false, ErrorConst.GenericError);
                });
            return deferred.promise;
        }

        var getCurrentPosition = function getCurrentPosition()
        {
            var deferred = $q.defer();
                navigator.geolocation.getCurrentPosition(function (position){
                    $rootScope.$apply(function () {
                        deferred.resolve(position);
                    });
                }, function () {
                    $rootScope.$apply(function () {
                        deferred.reject(false, ErrorConst.GenericError);
                    });
                });

            return deferred.promise;
        }

        return {
            getCurrentPosition: phonegapReadyService(function (onSuccess, onError, options) {

                    navigator.geolocation.getCurrentPosition(function () {
                            var that = this,
                                args = arguments;

                            if (onSuccess) {
                                $rootScope.$apply(function () {
                                    onSuccess.apply(that, args);
                                });
                            }
                        }, function () {
                            var that = this,
                                args = arguments;

                            if (onError) {
                                $rootScope.$apply(function () {
                                    onError.apply(that, args);
                                    alert("getCurrentPosition - onError - "+ args);
                                });
                            }
                        },
                        options);
            }),
            getCityFromGeoPoint: getCityFromGeoPoint,

            getCurrentPositionPromise: getCurrentPosition
        };


    });
