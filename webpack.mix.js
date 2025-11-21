const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.jsx', 'public/js')
    .react()
    .postCss('resources/css/app.css', 'public/css')
    .webpackConfig(webpack => {
        return {
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.MIX_GOOGLE_CLIENT_ID': JSON.stringify(process.env.MIX_GOOGLE_CLIENT_ID),
                }),
            ],
        };
    });
