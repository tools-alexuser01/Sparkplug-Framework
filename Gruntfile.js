module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: false,
                    cleancss: false,
                    optimization: 2,
                    dumpLineNumbers: 'comments'
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
            img: {
                cwd: '_input',
                src: 'img/*.*',
                dest: '_output/'
            },
            js: {
                cwd: '_input',
                src: 'js/*.js',
                dest: '_output/'
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
                tasks: ['includes:img'],
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
                    reloadDelay: 2000,
                    server: {
                        baseDir: "_output"
                    }
                }
            }
        },

        clean: {
            build: '_output/',
            css : 'css'      
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['clean', 'less', 'includes', 'browserSync', 'watch']);
};
