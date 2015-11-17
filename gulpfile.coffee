gulp = require 'gulp'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'
rename = require 'gulp-rename'
uglify = require 'gulp-uglify'

gulp.task 'build', ->
	gulp.src 'src/**/*.coffee'
	.pipe coffee
		bare: true
	.on 'error', swallowError
	.pipe concat 'pathos.js'
	.pipe gulp.dest 'dist'
	.pipe uglify
		preserveComment: 'some'
	.pipe rename 'pathos.min.js'
	.pipe gulp.dest 'dist'
	return

gulp.task 'default', ->
	gulp.start 'build'
	return

gulp.task 'dev', ->
	gulp.watch ['src/**/*.coffee'], ['build']
	return

swallowError = (error) ->
	console.error error.toString()
	this.emit 'end'