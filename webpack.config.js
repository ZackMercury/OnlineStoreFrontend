const path = require("path");
module.exports = {
    entry: './src/index.ts',
    
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
                            "@babel/preset-react"
                        ]
                    }
                }
                
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    }
}