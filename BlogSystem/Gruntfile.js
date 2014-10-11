/* global module, require */
'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          src: 'public/**/*.jade',
          ext: '.html'
        }]
      }
    },
    express: {
      dev: {
        options: {
          script: './server.js'
        }
      }
    },
    watch: {
      express: {
        options: {
          spawn: false
        },
        files:  [ './app/**/*.js' ],
        tasks:  [ 'express:dev' ]
      },
      jade: {
        options: {
          livereload: true
        },
        files: ['./public/**/*.jade'],
        tasks: ['jade']
      },
      frontend: {
        options: {
          livereload: true
        },
        files: [
          './public/css/*.css',
          './public/**/*.html',
          './public/js/**/*.js'
        ]
      }
    },
  });

  grunt.registerTask('serve', [/*'jade', */'express', 'watch']);
};
