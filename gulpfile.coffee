gulp = require 'gulp'
coffee = require 'gulp-coffee'
rename = require 'gulp-rename'
uglify = require 'gulp-uglify'
webpack = require 'webpack-stream'

gulp.task 'build', ->
	gulp.src 'src/index.coffee'
	.pipe webpack(require('./webpack.config.js'))
	.pipe gulp.dest 'dist'
	.pipe uglify()
	.pipe rename 'please.min.js'
	.pipe gulp.dest 'dist'

gulp.task 'default', ->
	gulp.start 'build'
	return

gulp.task 'dev', ->
	gulp.watch ['src/**/*.coffee'], ['build']
	return

swallowError = (error) ->
	console.error error.toString()
	this.emit 'end'