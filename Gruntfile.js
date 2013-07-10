/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    // uglify: {
    //   options: {
    //     banner: '<%= banner %>'
    //   },
    //   dist: {
    //     src: '<%= concat.dist.dest %>',
    //     dest: 'dist/<%= pkg.name %>.min.js'
    //   }
    // },

    // -- jshint config ----------------------------------------------------------
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },

    // -- copy config ----------------------------------------------------------
    copy: {
      jquery: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'components/jquery/',
          src: [
              'jquery.js',
              'jquery.min.js'
          ],
          dest: 'js/'
        }]
      },
      prelude: {
       files: [{
          expand: true,
          flatten: true,
          cwd: 'components/prelude/',
          src: [
              'build/common/reset.css',
              'build/common/typography.css',
              'build/common/forms.css',
              'build/components/buttons.css'
          ],
          dest: 'src/css/'
        },
        {
          expand: true,
          flatten: false,
          cwd: 'components/prelude/less/',
          src: [
              'mixins.less',
              'mixins/*.less',
          ],
          dest: 'src/less/'
        }]
      },
      html5boilerplate: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'components/html5-boilerplate/',
          src: [
              '.htaccess',
              'crossdomain.xml'
          ],
          dest: ''
        }]
      }
    },

    // -- Less Config ----------------------------------------------------------
    less: {
      site: {
        files: {
          "src/css/site.css": "src/less/site.less"
        }
      },
    },

    // -- Concat Config ----------------------------------------------------------
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      css: {
        src: [
          'src/css/reset.css',
          'src/css/typography.css',
          'src/css/forms.css',
          'src/css/buttons.css',
          'src/css/site.css'
        ],
        dest: 'css/style.css'
      }
    },

    // -- CSSMin Config --------------------------------------------------------
    cssmin: {
        options: {
          // report: 'gzip'
        },

        files: {
            expand: true,
            src   : 'css/*.css',
            ext   : '-min.css'
        }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  

  // Default task.

  grunt.registerTask('update', ['copy']);

  grunt.registerTask('default', ['less', 'concat', 'cssmin']);

};
