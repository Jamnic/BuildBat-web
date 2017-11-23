angular.module("app").controller('RegisterTomcatConfigurationController',
    function ($scope, $location, TomcatConfigurationsResource, TomcatContainersResource) {

        $scope.register = register;
        $scope.tomcatContainers = [];

        function init() {
            fetchTomcatContainers();
        }

        function register() {
            TomcatConfigurationsResource
                .put(
                    {},
                    {
                        name: $scope.name,
                        port: $scope.port,
                        tomcatContainerName: $scope.tomcatOption.name
                    })
                .then(function(success) {
                    $location.path("/tomcat/" + $scope.name)
                }, function(error){
                    console.log(error);
                })
        }

        function fetchTomcatContainers() {
            TomcatContainersResource
                .query()
                .$promise
                .then(function (success) {
                    $scope.tomcatContainers = success;
                }, function (error) {
                    console.log(error);
                })
        }

        init();
    });
