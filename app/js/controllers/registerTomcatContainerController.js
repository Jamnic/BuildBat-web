angular.module("app").controller('RegisterTomcatContainerController',
    function ($scope, $location, TomcatContainersResource) {

        $scope.register = register;

        function init() {
        }

        function register() {
            TomcatContainersResource
                .put(
                    {},
                    {
                        name: $scope.name,
                        home: $scope.home,
                    })
                .then(function(success) {
                    $location.path("/home")
                }, function(error){
                    console.log(error);
                })
        }

        init();
    });
