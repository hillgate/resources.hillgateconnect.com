# gulp
gulp = require('gulp')
cached = require('gulp-cached')
rename = require('gulp-rename')
runSequence = require('run-sequence')
del = require('del')

# css
less = require('gulp-less')
minifyCss = require('gulp-minify-css')

# js
watchify = require('watchify')
browserify = require('browserify')
uglify = require('gulp-uglify')
# coffeeify = require('coffeeify')
# reactify = require('reactify')
# sourcemaps = require('gulp-sourcemaps')

# dev/deploy
http = require('http')
path = require('path')
ecstatic = require('ecstatic')
liveReload = require('gulp-livereload')
usemin = require('gulp-usemin')
minifyHtml = require('gulp-minify-html')
rev = require('gulp-rev')

join = ->
  Array::slice.call(arguments).join ''

paths =
  src: 'src/'
  dist: 'dist/'
  tmp: 'tmp/'
paths.static = [
  join(paths.src, '**/*')
  'bower_components/jquery/dist/jquery.js'
  'bower_components/jquery-sticky/jquery.sticky.js'
  'bower_components/uikit/js/uikit.js'

  join('!', paths.src, '**/*.less')
  join('!', paths.src, '**/*.js')
  join('!', paths.src, '**/*.coffee')
]
paths.css = join(paths.src, 'css/*.less')
paths.js = join(paths.src, 'js/app.coffee')

bundleCache = {}
pkgCache = {}

# development
# ============================================================================
gulp.task 'dev:clean', (cb) ->
  del paths.tmp, cb

gulp.task 'dev:static', ->
  gulp.src(paths.static)
    .pipe(cached('static'))
    .pipe(gulp.dest(paths.tmp))
    .pipe(liveReload())

gulp.task 'dev:css', ->

  # Note: We do not include subfolders in the source glob
  gulp.src(join(paths.src, 'css/app.less'))
    .pipe(less())
    .pipe(gulp.dest(join(paths.tmp, 'css/')))
    .pipe(liveReload())

# appBundler = watchify(browserify(
#   entries: './' + paths.js
#   cache: bundleCache
#   packageCache: pkgCache
#   fullPaths: true
#   standalone: 'demo'
#   debug: true))
#
# appBundler.transform coffeeify
# # appBundler.exclude('jquery');
#
# gulp.task 'dev:js', ->
#   appBundler.bundle()
#     .pipe(gulp.src('app.js'))
#     .pipe(cached('app-js'))
#     .pipe(sourcemaps.init(loadMaps: true))
#     .pipe(sourcemaps.write('.'))
#     .pipe(gulp.dest(join(paths.tmp, 'js/')))
#     .pipe(liveReload())

gulp.task 'dev', (callback) ->
  runSequence [ 'dev:clean' ], [
    'dev:static'
    'dev:css'
  ], callback

gulp.task 'server', (cb) ->
  port = parseInt(process.env.PORT) or 9090
  rootFolder = path.join(__dirname, paths.tmp)
  server = http.createServer(ecstatic(root: rootFolder))
  server.listen port, cb

gulp.task 'watch', ->
  gulp.watch paths.css, [ 'dev:css' ]
  # appBundler.on('update', function(){
  #   gulp.start('dev:js');
  # });
  gulp.watch paths.static, [ 'dev:static' ]

gulp.task 'default', (callback) ->
  runSequence [ 'dev' ], [
    'server'
    'watch'
  ], callback





# deploy
# ============================================================================

gulp.task 'dist:clean', (cb) ->
  del paths.dist, cb

gulp.task 'dist', ->
  gulp.src(join(paths.tmp, '*.html'))
    .pipe(usemin(
      css: [minifyCss(), rev()]
      js: [uglify(), rev()]
      html: [ minifyHtml(empty: true) ]
    ))
    .pipe(gulp.dest(paths.dist))

gulp.task 'deploy:html', ->

gulp.task 'deploy:revved', ->

gulp.task 'deploy', (callback) ->
  runSequence [ 'dist' ], [ 'deploy:html', 'deploy:revved' ], callback
