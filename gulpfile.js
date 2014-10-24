var gulp = require('gulp');

var sass = require('gulp-sass');
var notify = require('gulp-notify');
var uglify = require('gulp-uglifyjs');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

gulp.task('default', ['connect','watch']);

gulp.task('connect', function() {
  connect.server({
    root: '/',
    livereload: true
  });
});

gulp.task('html', function () {
	return gulp.src('*.html')
		.pipe(connect.reload())
		.pipe(notify({
			message: 'HTML has been refreshed'
		}));
});

gulp.task('sass', function(){

	return gulp.src('sass/**/compiled.scss')
		.pipe(sass())
		.pipe(gulp.dest('css/'))
		.pipe(connect.reload())
		.pipe(notify({
			message: 'SASS has been compiled'
		}));
});

gulp.task('watch', function(){

	gulp.watch('*.html', ['html']);
	gulp.watch('sass/**/*.scss', ['sass']);

});