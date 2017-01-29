const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        publicPath: 'build/',
        filename: 'bundle.js'
    },
    watch: isDevelopment,
    devtool: isDevelopment && 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['react-hot-loader', 'babel-loader'],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=__[name]__[local]___[hash:base64:5]',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins() {
                                return [
                                    require('autoprefixer')
                                ];
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins() {
                                return [
                                    require('autoprefixer')
                                ];
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ["file-loader?name=public/img/[name].[ext]"]
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        })
    ]
};
