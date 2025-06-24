const path = require('path')
const CopyWebpackPlugIn = require('copy-webpack-plugin')

module.exports = {
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    entry : {
        app: './src/app.js',
        appReset: './src/appReset.js',
        service: './src/service.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    watch: true,
    plugins : [
        new CopyWebpackPlugIn({
            patterns: [{
                from: 'public'
            }]
        })
    ]
}