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
                    "css/main.css": "less/main.less"
                }
            }
        },

        includes: {
            html: {
                cwd: 'site', // cwd = current working directory
                src: ['*.html', 'templates/*.html'],
                dest: 'build/',
        
                options: {
                    flatten: true,
                    includePath: 'includes',
                    banner: '<!-- This is the build file! -->\n'
                }
            },
            img: {
                src: 'img/*.*',
                dest: 'build/'
            },
            styles: {
                src: 'css/*.css',
                dest: 'build/'
            },
            js: {
                src: 'js/*.js',
                dest: 'build/'
            }
        },

        watch: {
            html: {
                files: ['site/**/*.html', 'includes/**/*.html' ],
                tasks: ['includes:html'],
                options: {
                    nospawn: true,
                }
            },
            img: {
                files: ['img/*.*'],
                tasks: ['includes:img'],
                options: {
                    nospawn: true,
                }
            },
            styles: {
                files: ['less/**/*.less'], // which files to watch
                tasks: ['less', 'includes:styles'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: ['js/*.js'],
                tasks: ['includes:js'],
                options: {
                    nospawn: true,
                }
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: 'build/**'
                },
                options: {
                    watchTask: true,
                    reloadDelay: 2000,
                    server: {
                        baseDir: "build"
                    }
                }
            }
        },

        clean: {
            build: 'build',
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
