const { rimraf } = require("rimraf");
const { spawn } = require("child_process");
const gulp = require("gulp");
const cssnano = require("cssnano");
const stylelint = require("stylelint");
const cssimport = require("postcss-import");
const postcss = require("gulp-postcss");

const paths = {
  styles: ["theme/src/**/*.css"],
  unused: ["theme/static/css/_*.css"],
};

gulp.task("pelican", (cb) => {
  const cmd = spawn(
    "uv",
    [
      "tool",
      "run",
      "--with-requirements=requirements.txt",
      "pelican",
      "--autoreload",
      "--listen",
    ],
    { stdio: "inherit" },
  );
  cmd.on("close", function (code) {
    console.log("Server exited with code " + code);
    cb(code);
  });
});

const css = gulp.series(
  () =>
    gulp
      .src(paths.styles)
      // .pipe(sourcemaps.init())
      .pipe(postcss([stylelint, cssimport, cssnano]))
      // .pipe(sourcemaps.write()) // to debug in Chrome Developer Tools
      .pipe(gulp.dest("theme")),
  () => rimraf(paths.unused, { glob: true }),
);

gulp.task(
  "watch",
  gulp.parallel("pelican", () => gulp.watch(paths.styles, css)),
);

gulp.task("css", css);
gulp.task("default", css);
