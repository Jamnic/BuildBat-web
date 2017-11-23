angular.module("app").factory("ProjectResource", function ($q, $resource) {
    return $resource('http://localhost:10000/project/:projectName',
        {projectName: '@projectName'},
        {
            get: {method: 'GET'},
            put: {method: 'PUT'}
        });
});
