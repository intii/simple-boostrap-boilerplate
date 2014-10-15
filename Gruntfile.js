module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'src/',
          src: ['**/*.scss'],
          dest: 'web/css',
          ext: '.css'
        }]
      }
    },
    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'tmp/css',
          src: ['**/*.css'],
          dest: 'build/css'
        }]
      }
    },
    uncss: {
      build: {
        files: [{
          expand: true,
          cwd: 'web',
          src: ['**/*.html'],
          dest: 'tmp/css',
          ext: '.css'
        }]
      }
    },

    processhtml: {
      build: {
        files: {
          'web/page1/index.html': ['src/page1/index.html']
        }
      }
    },

    clean: {
      dev: ['web/**/*'],
      build: ['build/**/*'],
      tmp: ['tmp']
    },

    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.html'],
          dest: 'web'
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.html'],
          dest: 'build'
        }]
      }
    },

    watch: {
      sass: {
        files: 'src/**/*.scss',
        tasks: ['sass'],
        options: {
          interrupt: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('css', ['uncss','cssmin']);

  grunt.registerTask('dev', [
    'clean:dev',
    'copy:dev',
    'sass'
  ]);

  grunt.registerTask('build', [
    'clean:tmp',
    'clean:build',
    'dev',
    'copy:build',
    'css',
    // 'processhtml',
    'clean:tmp'
  ]);

};