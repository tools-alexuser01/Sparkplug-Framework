module.exports = function(grunt) {
    grunt.initConfig({
        less: {
        development: {
                options: {
                    compress: false,
                    cleancss: false,
                    optimization: 2,
                    dumpLineNumbers: 'comments' // 'comments' or 'false'
                },
                files: {
                    // target.css file: source.less file
                    "_output/css/main.css": "_input/less/main.less"
                }
            }
        },

        includes: {
                html: {
                    cwd: '_input', // cwd = current working directory
                    src: ['*.html', 'templates/*.html'],
                    dest: '_output/',
        
                options: {
                    flatten: true,
                    includePath: '_input/includes',
                    banner: '<!-- This is the output file! -->\n'
                }
                },

            js: {
                cwd: '_input',
                src: 'js/*.js',
                dest: '_output/'
            }
        },

        copy: {
            img: {
                files: [
                    {expand: true, cwd: '_input', src: ['img/**'], dest: '_output/'}
                ]
            }
        },

        watch: {
            html: {
                files: ['_input/**/*.html', 'includes/**/*.html' ],
                tasks: ['includes:html'],
                options: {
                    nospawn: true,
                }
            },
            img: {
                files: ['_input/img/*.*'],
                tasks: ['copy:img'],
                options: {
                    nospawn: true,
                }
            },
            styles: {
                files: ['_input/less/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: ['_input/js/*.js'],
                tasks: ['includes:js'],
                options: {
                    nospawn: true,
                }
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: '_output/**'
                },
                options: {
                    watchTask: true,
                    reloadDelay: 1,
                    server: {
                        baseDir: "_output"
                    }
                }
            }
        },

        uncss: {
            dist: {
                files: {
                    '_output/css/main.css': ['_output/*.html']
                }
            }
        },

        cssmin: {
            dist: {
                files: [
                    { src: '_output/css/main.css', dest: '_output/css/main.css' }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-uncss');

    grunt.registerTask('default', ['less', 'includes', 'copy', 'browserSync', 'watch']);
    grunt.registerTask('minify', ['uncss', 'cssmin']);

};
