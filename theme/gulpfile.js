const gulp = require("gulp");

const paths = {
  styles: ["src/**/*.css"],
};

gulp.task("watch", function () {
  gulp.watch(paths.styles, ["css"]);
});

gulp.task("css", function () {
  const postcss = require("gulp-postcss");
  const sourcemaps = require("gulp-sourcemaps");

  return gulp
    .src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(
      postcss([
        require("stylelint"),
        require("postcss-import"),
        require("cssnano"),
      ]),
    )
    .pipe(gulp.dest("."));
});

gulp.task("default", gulp.parallel("css"));