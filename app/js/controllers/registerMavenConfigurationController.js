angular.module("app").controller('RegisterMavenConfigurationController',
    function ($scope, $location, MavenConfigurationsResource) {

        $scope.register = register;

        function init() {
        }

        function register() {
            MavenConfigurationsResource
                .put(
                    {},
                    {
                        name: $scope.name,
                        version: $scope.version,
                        home: $scope.home
                    })
                .then(function(success) {
                    $location.path("/maven/" + $scope.name)
                }, function(error){
                    console.log(error);
                })
        }

        init();
    });
