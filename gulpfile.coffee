# gulp
gulp = require('gulp')
gutil = require('gulp-util')
source = require('vinyl-source-stream')
buffer = require('vinyl-buffer')
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
reactify = require('reactify')
sourcemaps = require('gulp-sourcemaps')

# dev/deploy
http = require('http')
path = require('path')
ecstatic = require('ecstatic')
liveReload = require('gulp-livereload')
usemin = require('gulp-usemin')
minifyHtml = require('gulp-minify-html')
rev = require('gulp-rev')
awspublish = require('gulp-awspublish')

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
]
paths.css = join(paths.src, 'css/*.less')
paths.js = join(paths.src, 'js/app.js')

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

bundler = watchify browserify "./#{paths.js}", watchify.args
bundler.transform reactify
bundler.exclude('jquery')

bundle = ->
  bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init(loadMaps: true))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(join(paths.tmp, 'js/')))
    .pipe(liveReload())

gulp.task 'dev:js', bundle

gulp.task 'dev', (callback) ->
  runSequence [ 'dev:clean' ], [
    'dev:static'
    'dev:css'
    'dev:js'
  ], callback

gulp.task 'server', (cb) ->
  port = parseInt(process.env.PORT) or 9090
  rootFolder = path.join(__dirname, paths.tmp)
  server = http.createServer(ecstatic(root: rootFolder))
  server.listen port, cb

gulp.task 'watch', ->
  gulp.watch paths.css, [ 'dev:css' ]
  bundler.on 'update', bundle
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
      js1: [uglify(), rev()]
      html: [ minifyHtml(empty: true) ]
    ))
    .pipe(gulp.dest(paths.dist))

gulp.task 'content', ->
  gulp.src(join(paths.tmp, 'content/**/*'))
    .pipe(gulp.dest(join(paths.dist, 'content')))

publisher = awspublish.create bucket: 'resources.hillgateconnect.com'
gulp.task 'publish:bare', ->
  gulp.src([
    "#{paths.dist}/**/*.html"
    "#{paths.dist}/**/*.md"
  ])
    .pipe(awspublish.gzip())
    .pipe(publisher.publish('Cache-Control': 'max-age=600')) # 10 minutes
    .pipe(awspublish.reporter())

gulp.task 'publish:revved', ->
  gulp.src([
    "#{paths.dist}/**/*"
    "!#{paths.dist}/**/*.html"
    "!#{paths.dist}/**/*.md"
  ])
    .pipe(awspublish.gzip())
    .pipe(publisher.publish('Cache-Control': 'max-age=315360000')) # 10 years
    .pipe(awspublish.reporter())

gulp.task 'deploy', (callback) ->
  runSequence(
    ['dist:clean']
    ['dist', 'content']
    ['publish:bare', 'publish:revved']
    callback
  )
