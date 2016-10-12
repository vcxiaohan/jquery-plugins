var gulp = require('gulp'),
    browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch(['**/*', '**/**/*']).on('change', browserSync.reload);
});
