module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: false, // minifies css if true
                    cleancss: false,
                    optimization: 2,
                    dumpLineNumbers: 'true'
                },
                files: {
                    // target.css file: source.less file
                    "css/main.css": "less/main.less"
                }
            }
        },
        includes: {
            build: {
                cwd: 'site', // cwd = current working directory
                src: [ '*.html', 'templates/*.html' ],
                dest: 'build/',
        
                options: {
                    flatten: true,
                    includePath: 'includes',
                    banner: '<!-- This is the build file! -->\n'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            styles: {
                files: ['less/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            html:{
                files: ['site/**/*.html', 'includes/**/*.html' ],
                tasks: ['includes'],
                options: {
                    nospawn: true,
                }
            }

        },
        uncss: {
            dist: {
                files: {
                    'css/main.css': ['build/**/*.html']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.registerTask('default', ['less', 'watch', 'includes']);
};