module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      client: {
        // src: ['server.js', 'server-config.js', 'lib/request-handler.js'],
        src: ['public/client/**/*.js'],
        dest: 'public/dist/client.concat.js'
      },
      // lib: {
      //   // src: ['server.js', 'server-config.js', 'lib/request-handler.js'],
      //   src: ['public/lib/**/*.js'],
      //   dest: 'public/dist/lib.concat.js'
      // }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      client: {
        files: {
          'public/dist/client.min.js': ['public/dist/client.concat.js']
        }
      },
      // lib: {
      //   files: {
      //     'public/dist/lib.min.js': ['public/dist/lib.concat.js']
      //   }
      // }
    },

    eslint: {
      target: ['**/*.js']
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('deploy-production', [

  ]);

  grunt.registerTask('deploy', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run(['deploy-production']);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  // grunt.registerTask('deploy', [
  //   // add your deploy tasks here
  // ]);


};
