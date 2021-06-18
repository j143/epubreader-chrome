const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'node_modules/epubjs-reader/reader',
                    to: './',
                    toType: 'dir',
                    force: true
                },
                {
                    from: 'src', 
                    to: './', 
                    toType: 'dir', 
                    force: true,
                    globOptions: { ignore: ['**/index.js'] }
                }
            ],
            options: {
                concurrency: 100,
            },
        }),
    ],
};
