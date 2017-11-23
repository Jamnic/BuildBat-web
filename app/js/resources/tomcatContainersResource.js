angular.module("app").factory("TomcatContainersResource", function ($q, $resource) {
    return $resource('http://localhost:10000/tomcat/container',
        {},
        {
            get: {method: 'GET'},
            put: {method: 'PUT'}
        });
});
