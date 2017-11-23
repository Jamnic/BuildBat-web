angular
    .module("app")
    .directive("projectNavBar", function () {
        return {
            restrict: 'E',
            scope: {
                project: '=',
                logModel: '=',
                tabsModel: '='
            },
            templateUrl: 'directives/project/projectNavBar.html',
            controller: function ($scope, $http) {
                $scope.runConfiguration = runConfiguration;

                function runConfiguration(configuration) {
                    $http.post("http://localhost:10000/" + configuration.json.executor, configuration.json)
                        .then(function (success) {
                            $scope.logModel.logs.push(success.data);
                            $scope.logModel.pickedLog = success.data;
                        }, function (error) {
                            console.log(error);
                        })
                }
            }
        };
    });