angular.module("app").factory("ProjectsResource", function($q, $resource) {
  return $resource('http://localhost:10000/projects');
});
