const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.argv.filter((str)=>str.includes("--mode"))[0].split("=")[1];

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
                    mode !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
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
    devServer: {
        static: {
            directory: path.join(__dirname, "dst")
        },
        compress: false,
        port: 80
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
    ]
}