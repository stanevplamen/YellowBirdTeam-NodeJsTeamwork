/* global blogApp */
'use strict';

blogApp.controller('NavController', ['$scope',
  function($scope) {

    $scope.posts = {
      label: 'Posts',
      link: '/posts'
    };

  }
]);
