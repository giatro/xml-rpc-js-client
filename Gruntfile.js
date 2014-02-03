module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		bower: {
			install: {
				options: {
					targetDir: './lib',
					layout: 'byComponent',
					install: true,
					verbose: true,
					cleanTargetDir: true,
					cleanBowerDir: false,
					bowerOptions: {}
				}
			}
		},
		sass: {
			dist: {
				files: {
					'dist/css/app.css': 'dev/scss/main.scss'
				}
			}
		},
		concat: {
			css: {
				src: [ "lib/font-awesome/css/font-awesome.css", "lib/js-object-renderer/ObjectRenderer.css", "dist/css/app.css" ],
				dest: 'dist/css/app.css'
			},
			js: {
				src : [ "lib/js-object-renderer/lib/prototype.js", "lib/js-object-renderer/ObjectRenderer.js", "lib/modernizr/modernizr.js", "lib/jquery/jquery.js", "dev/js/jqnc.js", "lib/jquery-xmlrpc/jquery.xmlrpc.js", "lib/foundation/js/foundation.js", "lib/xml-pretty-print/xml-prettify.js", "dev/js/main.js" ],
				dest : 'dist/js/app.js'
			}
		},
		copy: {
			main: {
				files: [
					{ expand: true, cwd: "lib/font-awesome/fonts/", src: [ "*" ], dest: 'dist/fonts/' },
					{ expand: true, cwd: "lib/angular/", src: [ "*" ], dest: 'dist/js/angular/' },
					{ expand: true, cwd: "dev/img/", src: [ "*" ], dest: 'dist/img/' },
					{ expand: true, cwd: "dev/js/", src: [ "event.js" ], dest: 'dist/js/' },
					{ expand: true, cwd: "dev/", src: [ "main.html", "manifest.json" ], dest: 'dist/' }
				]
			}
		},
		clean: ['bower_components'],
		watch: {
			pages: {
				files: ['dev/*'],
				tasks: ['dist'],
				options: {
					spawn: false,
				}
			}, 
			scss: {
				files: ['dev/scss/*'],
				tasks: ['dist'],
				options: {
					spawn: false,
				}
			}, 
			scripts: {
				files: ['dev/js/*'],
				tasks: ['concat:js','copy'],
				options: {
					spawn: false,
				}
			} 
		}
	});
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.registerTask('dist', [ 'sass', 'concat', 'copy', 'clean' ]);
	grunt.registerTask('init', [ 'bower', 'dist' ]);
};
