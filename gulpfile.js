var gulp = require("gulp"),
  gutil = require("gulp-util"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  autoprefixer = require("gulp-autoprefixer"),
  uglify = require("gulp-uglify"),
  jshint = require("gulp-jshint"),
  header = require("gulp-header"),
  rename = require("gulp-rename"),
  cssnano = require("gulp-cssnano"),
  sourcemaps = require("gulp-sourcemaps"),
  package = require("./package.json"),
  gulpIf = require("gulp-if"),
  imagemin = require("gulp-imagemin"),
  imageminMozjpeg = require("imagemin-mozjpeg"),
  cache = require("gulp-cache"),
  del = require("del"),
  runSequence = require("run-sequence"),
  wait = require("gulp-wait"),
  bourbon = require("bourbon").includePaths;

var banner = [
  "/*!\n" +
  " * <%= package.name %>\n" +
  " * <%= package.title %>\n" +
  " * <%= package.url %>\n" +
  " * @author <%= package.author %>\n" +
  " * @version <%= package.version %>\n" +
  " * Copyright " +
  new Date().getFullYear() +
  ". <%= package.license %> licensed.\n" +
  " */",
  "\n"
].join("");

gulp.task("css", function () {
  return gulp
    .src("src/scss/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer("last 4 version"))
    .pipe(gulp.dest("app/css"))
    .pipe(cssnano())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(
      header(banner, {
        package: package
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("app/css"))
    .pipe(wait(1500))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("js", function () {
  gulp
    .src("src/js/scripts.js")
    .pipe(sourcemaps.init())
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter("default"))
    .pipe(gulp.dest("app/js"))
    .pipe(uglify())
    .on("error", function (err) {
      gutil.log(gutil.colors.red("[Error]"), err.toString());
    })
    .pipe(
      header(banner, {
        package: package
      })
    )
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("app/js"))
    .pipe(
      browserSync.reload({
        stream: true,
        once: true
      })
    );
});

gulp.task("useref", function () {
  return gulp
    .src("app/*.html")
    .pipe(useref())
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulpIf("*.css", csso()))
    .pipe(gulp.dest("dist"));
});

gulp.task("images", function () {
  return gulp
    .src("app/images/**/*.+(png|jpg|gif|svg)")
    .pipe(
      cache(
        imagemin([
          imageminMozjpeg({
            quality: 75
          })
        ])
      )
    )
    .pipe(gulp.dest("dist/images"));
});

gulp.task("browser-sync", function () {
  browserSync.init(null, {
    server: {
      baseDir: "app"
    }
  });
});
gulp.task("bs-reload", function () {
  browserSync.reload();
});

gulp.task("default", ["css", "js", "browser-sync"], function () {
  gulp.watch("src/scss/**/*.scss", ["css"]);
  gulp.watch("src/js/*.js", ["js"]);
  gulp.watch("app/*.html", ["bs-reload"]);
});

gulp.task("clean", function () {
  return del.sync("dist").then(function (cb) {
    return cache.clearAll(cb);
  });
});

gulp.task("clean:dist", function () {
  return del.sync("dist");
});

gulp.task("build", function (callback) {
  runSequence("clean:dist", ["css", "useref", "images"], callback);
});
