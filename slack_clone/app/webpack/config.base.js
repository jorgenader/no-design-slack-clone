const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleTracker  = require('webpack-bundle-tracker');
const autoprefixer = require('autoprefixer');


// Which browsers should be supported (regarding css)
const autoprefixer_browsers = ['last 2 versions', '> 5%', 'IE >= 9'];

// The app/ dir
const app_root = path.resolve(__dirname, '..');
// The django app's dir
const project_root = path.resolve(app_root, '..');


function makeConfig(options) {
    const minimizeCss = options.minifyCss ? '&minimize' : '';

    const output = {
        path: path.resolve(app_root, 'build'),
        filename: options.filenameTemplate + '.js',
        publicPath: options.publicPath,
        library: 'chat',
    };

    return {
        entry: {
            app: options.prependSources.concat(['babel-polyfill', 'main.js']),
            styles: options.prependSources.concat([path.resolve(project_root, 'static', 'styles-src', 'main.js')]),
        },

        output,

        module: {
            rules: [{
                test: /\.js$/, // Transform all .js files required somewhere with Babel
                loader: 'babel-loader',
                exclude: /node_modules/,
            }, {
                test: /\.(css|scss)$/,
                loaders: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        'css-loader?sourceMap' + minimizeCss,
                        'postcss-loader',
                        'resolve-url-loader',
                        'sass-loader?sourceMap',
                    ],
                }),
            }, {
                test: /\.(jpe?g|png|gif|svg|woff2?|eot|ttf)$/,
                loader: 'url-loader',
                query: {
                    limit: 2000,
                    name: 'assets/[name].[hash].[ext]',
                },
            }],
        },

        plugins: [
            // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
            // inside your code for any environment checks; UglifyJS will automatically
            // drop any unreachable code.
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                },
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new ExtractTextPlugin({
                filename: options.filenameTemplate + '.css',
                disable: !options.extractCss,
            }),
            new BundleTracker({
                path: __dirname,
                filename: '../webpack-stats.json',
                indent: 2,
                logTime: true,
            }),
            new webpack.LoaderOptionsPlugin({
                options: {
                    context: __dirname,
                    output,

                    sassLoader: {
                        includePaths: [
                            path.resolve(project_root, 'node_modules', 'bootstrap-sass', 'assets', 'stylesheets'),
                        ],
                    },

                    postcss: function () {
                        return [autoprefixer({browsers: autoprefixer_browsers})];
                    },
                },
            }),
        ].concat(options.plugins),

        resolve: {
            modules: ['app/src', 'node_modules'],
            extensions: ['.js'],
        },

        devtool: options.devtool,
        target: 'web', // Make web variables accessible to webpack, e.g. window
        // stats: false, // Don't show stats in the console

        performance: options.performance,
    };
}


module.exports = makeConfig;
