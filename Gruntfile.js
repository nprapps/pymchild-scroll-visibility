/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Load package config
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        expr: true,
        sub: true,
        node: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        loopfunc: true,
        globals: {
          jQuery: true,
          requirejs: true,
        }
      },
      conf: [
        "Gruntfile.js",
        "package.json"
      ],
      lib: {
        options: {
          browser: true,
          predef: ['define']
        },
        src: "src/**/*.js",
      }
    },
    jsdoc: {
      lib: {
        src: ["src/**/*.js", "README.md", "package.json"],
        dest: "api",
        options: {
          template : "node_modules/minami",
          configure : "jsdoc.conf.json"
        }
      }
    },
    concat: {
      lib: {
        options: {
          banner: '/*! pymchild-scroll-visibility.js - v<%= pkg.version %> - ' +
                  '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        src: ['src/pymchild-scroll-visibility.js'],
        dest: 'dist/pymchild-scroll-visibility.v<%= pkg.version[0] %>.js'
      },
    },
    uglify: {
      lib: {
        options: {
          banner: '/*! pymchild-scroll-visibility.js - v<%= pkg.version %> - ' +
                  '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'dist/pymchild-scroll-visibility.v<%= pkg.version[0] %>.min.js': ['dist/pymchild-scroll-visibility.v<%= pkg.version[0] %>.js']
        }
      }
    },
    watch: {
      server: {
        files: ["src/**/*.js", "examples/**/*"],
        options: {
          livereload: true
        }
      }
    },
    // via http://rhumaric.com/2013/07/renewing-the-grunt-livereload-magic/
    express: {
      all: {
        options: {
          port: 9000,
          hostname: "localhost",
          bases: ['.'],
          livereload: true,
          open: 'http://localhost:<%= express.all.options.port%>/examples/visible'
        }
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-jsdoc");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-express');

  // Default task.
  grunt.registerTask("default", ["jshint", "concat", "uglify", "jsdoc"]);
  grunt.registerTask("server", ["express", "watch:server"]);


};
