let mix = require('laravel-mix');

mix.js('resources/assets/js/app.js', 'public/assets/dist/js/');
mix.sass('resources/assets/sass/app.scss', 'public/assets/dist/css/');