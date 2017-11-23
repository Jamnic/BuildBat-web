angular.module("app").factory("TomcatConfigurationsResource", function ($q, $resource) {
    return $resource('http://localhost:10000/tomcat/configuration',
        {},
        {
            get: {method: 'GET'},
            put: {method: 'PUT'}
        });
});
