var webpack = require('webpack');
var glob = require('glob');
var path = require('path');
var getEntry = function () {
    var entry = {};
    glob.sync('./src/js/**/*.js').forEach(function (name) {
        console.log(name);
        var arr = name.split('/');
        var secondDirName = "";
        if (arr.length > 2) {
            secondDirName = name.split('/')[3];
            console.log(secondDirName);
        }
        if (secondDirName == "lib") {


        }
        else {
            var n = name.slice(name.lastIndexOf('/js/') + 4, name.length - 3);
            entry[n] = name;
        }
    });
    /*entry['commons']=['./src/js/lib/header.js'];
    entry['header']=['./src/js/lib/headers.js'];*/
    return entry;
};

module.exports = {
    entry: getEntry(),
    output: {
        path: './build/js',
        publicPath: '',
        filename: '[name].js',
    },
    //devtool: "#cheap-module-source-map",//eval-source-map
    //devtool: "#eval-source-map",
    //devtool:"#eval",
    //devtool: "#source-map",
    devtool: "#cheap-module-eval-source-map",//dev  ± π”√
    //devtool:null,
    module: {
        loaders: [
        {
            test: /\.tpl$/,
            loader: "tmodjs-loader"
        },
        {
                test: /\.json$/,
                loader: "json-loader"
        }
        ]
    },
    resolve: {
        extensions: ['.js', '.tpl', '.less', '.json', ''],
        root: [path.join(__dirname, './src/tpl')]
    },

    plugins: [
     /* new webpack.optimize.UglifyJsPlugin({
                compress:{warnings:false}
              })*/
    ]
}