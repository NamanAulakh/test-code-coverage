/* eslint-disable no-console */
import gulp from 'gulp'
import runSequence from 'run-sequence'
import del from 'del'
import path from 'path'
import gulpLoadPlugins from 'gulp-load-plugins'

const plugins = gulpLoadPlugins()

const paths = {
  js: ['./**/*.js', '!build/**', '!node_modules/**', '!flow-typed/**', '!oldbabelrc.js'],
  nonJs: ['./src/config/**'],
}

// Clean up build directory
gulp.task('clean', () =>
  del(['build/**']).then(pathsToBedeleted =>
    console.log('Deleted files and folders:\n', pathsToBedeleted.join('\n')),
  ),
)

// Copy non-js files to dist
gulp.task('copy', () =>
  gulp
    .src(paths.nonJs)
    .pipe(plugins.newer('build/src/config/'))
    .pipe(gulp.dest('build/src/config/')),
)

// Compile ES6 to ES5 and copy to build
gulp.task('babel', () =>
  gulp
    .src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
    .pipe(plugins.newer('build'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(
      plugins.sourcemaps.write('.', {
        includeContent: false,
        sourceRoot(file) {
          return path.relative(file.path, __dirname)
        },
      }),
    )
    .pipe(gulp.dest('build')),
)

// Start server with restart on file changes
gulp.task('nodemon', ['copy', 'babel'], () =>
  plugins.nodemon({
    execMap: {
      js: 'node --inspect',
    },
    script: path.join('build', '/src', 'index.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'build/**/*.js'],
    tasks: ['babel'],
  }),
)

// gulp serve for development
gulp.task('serve', ['clean'], () => runSequence(['nodemon']))
// gulp.task('serve', () => runSequence(['sync']))

// default task: clean build, compile js files and copy non-js files.
gulp.task('default', ['clean'], () => {
  runSequence(['copy', 'babel'])
})

// gulp.task('sync', () => {
//   console.log('Yo.........Yo')
//
//   plugins.nodemon({
//     execMap: {
//       js: 'yarn sync',
//     },
//     // script: path.join('build', '/src', 'index.js'),
//     ext: 'js',
//     ignore: ['node_modules/**/*.js', 'build/**/*.js'],
//     // tasks: ['babel'],
//   })
// })
