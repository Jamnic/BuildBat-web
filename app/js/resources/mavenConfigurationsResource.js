angular.module("app").factory("MavenConfigurationsResource", function ($q, $resource) {
    return $resource('http://localhost:10000/maven/configuration',
        {},
        {
            get: {method: 'GET'},
            put: {method: 'PUT'}
        });
});
