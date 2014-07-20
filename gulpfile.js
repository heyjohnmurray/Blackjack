var gulp = require('gulp');

var sass = require('gulp-sass');
var notify = require('gulp-notify');
var uglify = require('gulp-uglifyjs');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

gulp.task('default', ['connect','watch','sass']);

gulp.task('connect', function() {
  connect.server({
    root: '/',
    livereload: true
  });
});



gulp.task('sass', function(){

	return gulp.src('sass/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css/'))
		.pipe(connect.reload())
		.pipe(notify({
			message: 'SASS has been compiled'
		}));
});

gulp.task('watch', function(){

	gulp.watch('sass/**/*.scss', ['sass']); //watch any sass file change

});