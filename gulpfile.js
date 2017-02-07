/**
 * Created by xuanjiu on 17/1/19.
 */
var gulp = require('gulp');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");
var path = require('path'); 
del = require('del');

gulp.task('clean', function(){
  del([
      './build/**/*',
    ]);
  console.log('clean build folder.');
});

gulp.task('dev', ['clean'], function() {
  config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/only-dev-server");
  console.log(config);
  var compiler = webpack(config);
  var server = new webpackDevServer(compiler, {
    contentBase: path.resolve( __dirname ,'./'),
    hot: true,
    publicPath: "/build/",
    headers: { "X-Custom-Header": "yes" },
    stats: { colors: true },
    proxy: {
      /*'/h5/service/': {
        target: 'http://192.168.51.22/'
        //target: 'http://localhost:3002/',
        //pathRewrite: {'^/h5/service/' : '/'}
      },*/
      '/cdn/**/*': {
        target: 'http://192.168.51.22/'
      }
    }
  });
  server.listen(8080);
});
