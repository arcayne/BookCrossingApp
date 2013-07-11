'use strict';

angular.module('BookCrossingApp')
  .controller('SignUpDetailsCtrl', function ($scope, dataService, $location, $http,$rootScope) {

        var disabledClass = 'disabling';
        $scope.maleClass = disabledClass;
        $scope.femaleClass = disabledClass;
        $scope.setDate = false;

        $scope.selectSex = function (sex) {
            if (sex=="Male"){
                $scope.user.gender = "Male";
                $scope.maleClass = "NoDisable";
                $scope.femaleClass = disabledClass;
            }
            else if (sex=="Female"){
                $scope.user.gender = "Female";
                $scope.femaleClass = "NoDisable";
                $scope.maleClass = disabledClass;
            }
            else{
                $scope.user.gender = "";
                $scope.femaleClass = disabledClass;
                $scope.maleClass = disabledClass;
            }
        };

        dataService.getCurrentUser(function(currentUser){
            var profilePhoto = "styles/img/user.png";

            if(currentUser != null )
            {
                profilePhoto = currentUser.get("myFile");

                if(profilePhoto != undefined)
                {
                    $scope.myPicture = profilePhoto.url();
                }
            }

            $scope.user = {
                nick: currentUser.get('nick'),
                gender: currentUser.get('gender'),
                birthday: currentUser.get('birthday'),
                favoriteGenre:currentUser.get('favoriteGenre'),
                myPicture: profilePhoto
            };

            $scope.selectSex($scope.user.gender);
         });

        $scope.updateUserProfile = function (user) {

                dataService.updateUserProfile(user, function (isResult, result) {

                    $scope.$apply(function () {
                        if (isResult)
                        {
                            $location.path('/Main');
                        }
                        else
                        {
                            $rootScope.TypeNotification = "errormessage";
                            $rootScope.MessageNotification = result.message;
                        }
                    });
                });
        }

        $scope.getPicture = function(){

//            navigator.camera.getPicture(onSuccess, onFail,
//                //Options => http://docs.phonegap.com/en/2.6.0/cordova_camera_camera.md.html#Camera
//                { quality: 50,
//                    //destinationType:Camera.DestinationType.FILE_URI,
//                    destinationType:Camera.DestinationType.DATA_URL,
//                    encodingType: Camera.EncodingType.JPEG,
//                    sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY,
//                    //sourceType : Camera.PictureSourceType.PHOTOLIBRARY ,//CAMERA,
//                    targetWidth: 100,
//                    targetHeight: 100
//                });

            navigator.camera.getPicture(gotPic, failHandler,
                {quality:50,
                 destinationType:Camera.DestinationType.FILE_URI,
                 sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY
                });

            function gotPic(data) {

                $scope.myPicture = data;

                window.resolveLocalFileSystemURI(data, function(entry) {

                    var reader = new FileReader();

                    reader.onloadend = function(evt) {
                        console.log('read onloderend');
                        console.log(JSON.stringify(evt.target));
                        console.log(evt.target.result);
                        var byteArray = new Uint8Array(evt.target.result);
                        var output = new Array( byteArray.length );
                        var i = 0;
                        var n = output.length;
                        while( i < n ) {
                            output[i] = byteArray[i];
                            i++;
                        }
                        var parseFile = new Parse.File("mypic.jpg", output);
                        console.log(byteArray.length);
                        console.log(parseFile.toString());
                        console.log('trying to save');
                        parseFile.save().then(function(ob) {
                            navigator.notification.alert("Got it!", null);
                            navigator.notification.alert(JSON.stringify(ob), null);
                            console.log(JSON.stringify(ob));

                            var currentUser = Parse.User.current();

                            //currentUser.set("myPicture",ob._url);
                            currentUser.set("myFile",ob);

                            currentUser.save().then(function(){
                                    navigator.notification.alert("success updating user!", null);
                                    //callback(true);
                                }
                                , function(error) {
                                    // The file either could not be read, or could not be saved to Parse.
                                    navigator.notification.alert("error updating user!", null);
                                    console.log("Error: " + error.code + " " + error.message)
                                    //callback(false,error);
                                });

                        }, function(error) {
                            console.log("Error");
                            console.log(error);
                        });

                    }

                    reader.onerror = function(evt) {
                        console.log('read error');
                        console.log(JSON.stringify(evt));
                    }

                    console.log('pre read');

                    entry.file(function(s) {
                        reader.readAsArrayBuffer(s);
                    }, function(e) {
                        console.log('ee');
                    });

                    //reader.readAsArrayBuffer(entry.file(function(s) { console.log('ss');}, function(e) { console.log('e');});
                    console.log('fired off the read...');
                });

            }

            function failHandler(e) {
                alert("ErrorFromC");
                alert(e);
                console.log(e.toString());
            }
        };
});
