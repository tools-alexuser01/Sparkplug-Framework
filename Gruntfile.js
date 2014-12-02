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

        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-includes');
    grunt.registerTask('default', ['less', 'watch', 'includes']);
};