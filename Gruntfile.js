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

    // -- Clean Config ---------------------------------------------------------
    clean: {
        img : ['img/'],
        css : ['css/'],
    },

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
              'build/common/forms-core.css',
              'build/components/buttons-core.css'
          ],
          dest: 'src/css/'
        },
        {
          expand: true,
          flatten: false,
          cwd: 'components/prelude/less/',
          src: [
              'init.less',
              'variables.less',
              'mixins.less',
              'mixins/*.less',
          ],
          dest: 'src/less/'
        },
        {
          expand: true,
          flatten: false,
          cwd: 'components/prelude/less',
          src: [
              'functions/grid/*.less'
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
      },
      html5shiv: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'components/html5shiv/dist',
          src: [
              'html5shiv.js'
          ],
          dest: 'js/'
        }]
      },
      rainbow: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'components/rainbow/js',
          src: [
              'rainbow.min.js',
          ],
          dest: 'js/'
        },
        {
          expand: true,
          flatten: true,
          cwd: 'components/rainbow/js/language',
          src: [
              'html.js',
              'css.js'
          ],
          dest: 'js/language/'
        },
        {
          expand: true,
          flatten: true,
          cwd: 'components/rainbow/themes',
          src: [
              'github.css'
          ],
          dest: 'src/css/themes'
        }]
      }
    },

    // -- Less Config ----------------------------------------------------------
    less: {
      site: {
        files: {
          "src/css/grid-core.css": "src/less/functions/grid/grid-core.less",
          "src/css/grid-base.css": "src/less/functions/grid/grid-base.less",
          "src/css/grid-equalization.css": "src/less/functions/grid/grid-equalization.less",
          "src/css/grid-phrase.css": "src/less/functions/grid/grid-phrase.less",
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
          'src/css/font.css',
          'src/css/reset.css',
          'src/css/typography.css',
          'src/css/forms-core.css',
          'src/css/buttons-core.css',
          'src/css/grid-core.css',
          'src/css/grid-base.css',
          'src/css/grid-equalization.css',
          'src/css/grid-phrase.css',
          'src/css/site.css',
          'src/css/themes/github.css'
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
            src   : ['css/*.css', '!css/*-min.css'],
            ext   : '-min.css'
        }
    },

    // -- ImageMin Config --------------------------------------------------------
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 0
        },
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*'],
          dest: 'img/'
        }]
      }
    },

    // -- Text Replace Config --------------------------------------------------------
    replace: {
      html: {
        src: ['src/*.html'],
        dest: './',
        replacements: [{ 
          from: /\<!-- replace:css -->([\S\s]*?)<!-- endreplace -->/gm,
          to: '    <link rel="stylesheet" href="css/style.css">'
        }]
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
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-text-replace');

  // Default task.

  grunt.registerTask('update', ['copy']);
  grunt.registerTask('css', ['clean:css', 'less', 'concat', 'cssmin']);
  grunt.registerTask('img', ['clean:img', 'imagemin']);
  grunt.registerTask('html', ['replace:html']);
  
  grunt.registerTask('default', ['css','img','html']);
};