angular.module("app").config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode({enabled: true});

    $routeProvider.when('/home', {
        templateUrl: 'home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/project/:projectName*', {
        templateUrl: 'project/project.html',
        controller: 'ProjectController',
        resolve: {
            project: function ($route, ProjectResource) {
                return ProjectResource
                    .get($route.current.params)
                    .$promise
                    .then(handleSuccess, handleFailure)
            }
        }
    });

    $routeProvider.when('/maven/:configurationName*', {
        templateUrl: 'maven.html',
        controller: 'MavenConfigurationController',
        resolve: {
            maven: function ($route, MavenConfigurationResource) {
                return MavenConfigurationResource
                    .get($route.current.params)
                    .$promise
                    .then(handleSuccess, handleFailure)
            }
        }
    });
    $routeProvider.when('/tomcat/:configurationName*', {
        templateUrl: 'tomcat.html',
        controller: 'TomcatConfigurationController',
        resolve: {
            tomcat: function ($route, TomcatConfigurationResource) {
                return TomcatConfigurationResource
                    .get($route.current.params)
                    .$promise
                    .then(handleSuccess, handleFailure)
            }
        }
    });

    $routeProvider.when('/registerProject', {
        templateUrl: 'project/registerProject.html',
        controller: 'RegisterProjectController'
    });

    $routeProvider.when('/registerMavenConfiguration', {
        templateUrl: 'registerMavenConfiguration.html',
        controller: 'RegisterMavenConfigurationController'
    });

    $routeProvider.when('/registerTomcatConfiguration', {
        templateUrl: 'registerTomcatConfiguration.html',
        controller: 'RegisterTomcatConfigurationController'
    });

    $routeProvider.when('/registerTomcatContainer', {
        templateUrl: 'registerTomcatContainer.html',
        controller: 'RegisterTomcatContainerController'
    });

    $routeProvider.when('/log/:logfile*', {
        templateUrl: 'log.html',
        controller: 'LogController',
        resolve: {
            logfilePath: function ($route) {
                return $route.current.params.logfile;
            }
        }
    });

    $routeProvider.otherwise({redirectTo: '/home'});

    function handleSuccess(success) {
        return success;
    }

    function handleFailure(success) {
        return success;
    }
});
