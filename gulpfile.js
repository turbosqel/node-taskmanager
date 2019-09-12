const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', gulp.parallel('scripts', () => {
  gulp.watch('src/**/*.ts', gulp.parallel('scripts'));
}));

gulp.task('default', gulp.series('watch'));
