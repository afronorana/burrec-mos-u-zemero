let mix = require('laravel-mix');

var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
mix.webpackConfig({
  plugins: [new HardSourceWebpackPlugin()]
});


mix.options({
  processCssUrls: false
})
.sourceMaps(false, 'source-map')
.js('resources/assets/js/app.js', 'public/assets/dist/js/')
.sass('resources/assets/sass/app.scss', 'public/assets/dist/css/');
