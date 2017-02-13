const path = require('path');
const webpack = require('webpack');

const makeConfig = require('./config.base');


// The app/ dir
const app_root = path.resolve(__dirname, '..');
const filenameTemplate = 'app/[name]';


const config = makeConfig({
    filenameTemplate: filenameTemplate,

    devtool: 'eval-source-map',

    extractCss: false,
    minifyCss: false,

    // Needed for inline CSS (via JS) - see set-public-path.js for more info
    prependSources: [path.resolve(app_root, 'webpack', 'set-public-path.js')],

    // This must be same as Django's STATIC_URL setting
    publicPath: '/static/',

    plugins: [
    ],

    performance: {
        // Hints disabled in dev due to beta 28 including sourcemaps and complaining about ridiculous sizes
        // Remove this when updating to 2.2.0-rc.0
        hints: false,
    },
});
console.log("Using DEV config");


module.exports = config;
