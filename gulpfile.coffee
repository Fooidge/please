gulp = require 'gulp'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'
insert = require 'gulp-insert'
rename = require 'gulp-rename'
sourcemaps = require 'gulp-sourcemaps'
uglify = require 'gulp-uglify'

boiler =
	start: """
		(function(){
		var please = {
			version: '2.0.0'
		};
		"""
	end: """
		if ( typeof define === 'function' && define.amd ){
				define(please);
			}
			else if ( typeof module === 'object' && module.exports ){
				module.exports = please;
			}
			this.please = please;
		})();
		"""

gulp.task 'build', ->
	gulp.src 'src/**/*.coffee'
	.pipe sourcemaps.init()
	.pipe coffee
		bare: true
	.on 'error', swallowError
	.pipe concat 'please.js'
	.pipe insert.wrap(boiler.start, boiler.end)
	.on 'error', swallowError
	.pipe sourcemaps.write()
	.pipe gulp.dest 'dist'
	.pipe uglify
		preserveComment: 'some'
	.pipe rename 'please.min.js'
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