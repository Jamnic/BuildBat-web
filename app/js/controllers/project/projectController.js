angular
    .module("app")
    .controller('ProjectController', function ($scope, $location, project) {
        $scope.project = project;
        $scope.logModel = {logs: project.logs, pickedLog: undefined};
        $scope.logsCollapsed = false;
        $scope.project.runConfigurations = [];
        $scope.tabsModel = {selectedTab: "projectInfo"};

        if (project.params.maven) {
            $scope.project.runConfigurations.push({
                name: "Maven build",
                json: {
                    command: "-U clean install",
                    projectName: project.name,
                    executor: "maven"
                }
            });

            $scope.project.runConfigurations.push({
                name: "Maven war package",
                json: {
                    command: "-U clean install war:war",
                    projectName: project.name,
                    executor: "maven"
                }
            });
        }

        if (project.params.tomcat) {
            $scope.project.runConfigurations.push({
                name: "Tomcat deploy",
                json: {
                    command: 'cmd.exe /c copy "{warFile}" "{home}webapps\\{pathName}.war"',
                    projectName: project.name,
                    executor: "tomcat",
                    tomcatConfiguration: project.params.tomcat
                }
            });
            $scope.project.runConfigurations.push({
                name: "Tomcat run",
                json: {
                    command: 'cmd.exe /c catalina.bat run -config "{serverXml}"',
                    projectName: project.name,
                    executor: "tomcat",
                    tomcatConfiguration: project.params.tomcat
                }
            });
        }
    });
