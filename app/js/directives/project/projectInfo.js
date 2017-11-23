angular
    .module("app")
    .directive("projectInfo", function () {
        return {
            restrict: 'E',
            scope: {
                project: '='
            },
            templateUrl: 'directives/project/projectInfo.html',
            controller: function ($scope) {}
        };
    });