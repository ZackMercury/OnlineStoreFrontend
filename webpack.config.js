const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.tsx',
    
    output: {
        path: path.resolve(__dirname, "dst"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env", 
                                {
                                    targets: "defaults"
                                }
                            ],
                            "@babel/preset-typescript",
                            ["@babel/preset-react", { runtime: "automatic" }]
                        ]
                    }
                }
                
            },
            {
                test: /\.s?css$/,
                use: [
                    process.env.MODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
    ]
}