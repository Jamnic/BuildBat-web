angular.module("app").controller('RegisterProjectController',
    function ($scope, $location, ProjectResource, MavenConfigurationsResource, TomcatConfigurationsResource) {

        function init() {
            $scope.mavenConfigurations = [];
            $scope.tomcatConfigurations = [];
            fetchMavenConfigurations();
            fetchTomcatConfigurations();
        }

        $scope.registerNewProject = function () {
            ProjectResource.put(
                {projectName: $scope.newProjectName},
                {
                    directory: $scope.newProjectDirectory,
                    customParams: {
                        tomcat: $scope.tomcatOption.name,
                        maven: $scope.mavenOption.name
                    }
                })
                .$promise
                .then(function (success) {
                    $location.path("/project/" + $scope.newProjectName)
                }, function (error) {
                    console.log(error);
                })
        };

        function fetchMavenConfigurations() {
            MavenConfigurationsResource
                .query()
                .$promise
                .then(function (success) {
                    $scope.mavenConfigurations = success;
                }, function (error) {
                    console.log(error);
                })
        }

        function fetchTomcatConfigurations() {
            TomcatConfigurationsResource
                .query()
                .$promise
                .then(function (success) {
                    $scope.tomcatConfigurations = success;
                }, function (error) {
                    console.log(error);
                })
        }

        init();
    });
