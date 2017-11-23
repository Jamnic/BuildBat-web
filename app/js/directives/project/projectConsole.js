angular
    .module("app")
    .directive("projectConsole", function () {
        return {
            restrict: 'E',
            scope: {
                project: '=',
                logModel: '='
            },
            templateUrl: 'directives/project/projectConsole.html',
            controller: function ($scope, $http) {

                $scope.runConfiguration = runConfiguration;
                $scope.viewLog = viewLog;

                function viewLog(log) {
                    $scope.logModel.pickedLog = log;
                }

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