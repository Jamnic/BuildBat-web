angular
    .module("app")
    .directive("mainNavBar", function (ProjectsResource, MavenConfigurationsResource, TomcatConfigurationsResource) {
        return {
            restrict: 'E',
            templateUrl: 'directives/mainNavBar.html',
            controller: function ($scope, $location) {

                $scope.goToPath = goToPath;

                function init() {
                    $scope.projects = [];
                    $scope.mavenConfigurations = [];
                    $scope.tomcatConfigurations = [];
                    fetchProjects();
                    fetchMavenConfigurations();
                    fetchTomcatConfigurations();
                }

                function fetchProjects() {
                    ProjectsResource
                        .query()
                        .$promise
                        .then(function (success) {
                            $scope.projects = success;
                        }, function (error) {
                            console.log(error);
                        })
                }

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


                function goToPath(path) {
                    $location.path(path)
                }

                init();
            }
        };
    });