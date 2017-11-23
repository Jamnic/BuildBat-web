angular.module("app").factory("TomcatConfigurationResource", function ($q, $resource) {
    return $resource('http://localhost:10000/tomcat/configuration/:configurationName',
        {configurationName: '@configurationName'},
        {
            get: {method: 'GET'}
        });
});
