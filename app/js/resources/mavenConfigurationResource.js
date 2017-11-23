angular.module("app").factory("MavenConfigurationResource", function ($q, $resource) {
    return $resource('http://localhost:10000/maven/configuration/:configurationName',
        {configurationName: '@configurationName'},
        {
            get: {method: 'GET'}
        });
});
