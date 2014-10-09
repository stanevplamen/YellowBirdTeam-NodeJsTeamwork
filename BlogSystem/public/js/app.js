/* global angular */
'use strict';

var blogApp = angular.module('blogApp', ['ngRoute']);

blogApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: '/home'
      })
      .when('/users/register', {
        templateUrl: '/users/register'
      })
      .when('/users/login', {
        templateUrl: '/users/login'
      })
      .when('/posts', {
        templateUrl: '/posts'
      })
      .when('/posts/:id', {
        templateUrl: '/posts'
      })
      .when('/posts/create', {
        templateUrl: '/posts/create'
      });

  }
]);
