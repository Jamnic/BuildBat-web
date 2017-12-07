angular
    .module("app")
    .controller('ProjectController', function ($scope, $location, project, ProjectLogsResource) {
        $scope.project = project;
        $scope.logModel = {logs: project.logs, pickedLog: undefined, reload: reload};
        $scope.logsCollapsed = false;
        $scope.project.runConfigurations = [];
        $scope.tabsModel = {selectedTab: "projectInfo"};

        if (project.params.maven) {
            $scope.project.runConfigurations.push({
                name: "Build",
                json: {
                    command: "-U clean install",
                    projectName: project.name,
                    executor: "maven"
                }
            });

            $scope.project.runConfigurations.push({
                name: "War package",
                json: {
                    command: "package",
                    projectName: project.name,
                    executor: "maven"
                }
            });

            $scope.project.runConfigurations.push({
                name: "Test",
                json: {
                    command: "test -T4 -DspringProfileName=test",
                    projectName: project.name,
                    executor: "maven"
                }
            });
        }

        if (project.params.tomcat) {
            $scope.project.runConfigurations.push({
                name: "Deploy",
                json: {
                    command: 'cmd.exe /c copy "[web {warFile}]" "{home}\\webapps\\{pathName}.war"',
                    projectName: project.name,
                    executor: "tomcat",
                    tomcatConfiguration: project.params.tomcat
                }
            });
            $scope.project.runConfigurations.push({
                name: "Run",
                json: {
                    command: 'cmd.exe /c catalina.bat run -config "{serverXml}"',
                    projectName: project.name,
                    executor: "tomcat",
                    tomcatConfiguration: project.params.tomcat
                }
            });
        }

        function reload() {
            ProjectLogsResource
                .get({projectName: $scope.project.name})
                .$promise
                .then(function (success) {
                    $scope.logModel.logs = success.logs;
                    $scope.logModel.pickedLog = success.logs[success.logs.length - 1]
                }, function (error) {
                    console.log(error);
                })
        }
    });


