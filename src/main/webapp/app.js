'use strict';

var app = angular.module('myApp', []);
app.controller('PersonController', function ($scope) {
    $scope.Persons = [
        {firstName: 'Jim', lastName: 'Henson'}
    ];
});

app.filter('name', function () {
    return function (person) {
        return person.lastName + ", " + person.firstName;
    };
});

app.directive('loginForm', function () {
    return {
        restrict: 'E',
        templateUrl: 'login-form.html'
    };
});

app.factory('CaseFactory', function () {
    var titleCase = function (String) {
        return String.replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
    };

    var camelCase = function (String) {
        return String.toLowerCase()
                // Replaces any - or _ characters with a space 
                .replace(/[-_]+/g, ' ')
                // Removes any non alphanumeric characters 
                .replace(/[^\w\s]/g, '')
                // Uppercases the first character in each group immediately following a space 
                // (delimited by spaces) 
                .replace( /\b\w/g, function (m) {
                return m.toUpperCase();
                })
                // Removes spaces 
                .replace(/ /g, '');
                // Capitalizes first letter
            };

    var dashCase = function (String) {
        return String.replace(/\s+/g, '-').toLowerCase();
    };
    return {
        titleCase: titleCase,
        camelCase: camelCase,
        dashCase: dashCase
    };
});

app.controller('CaseController', function ($scope, CaseFactory) {
    $scope.titleCase = CaseFactory.titleCase("my example service");
    $scope.camelCase = CaseFactory.camelCase("my example service");
    $scope.dashCase = CaseFactory.dashCase("my example service");
});