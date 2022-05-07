const path = require("path");
module.exports = {
    entry: './src/index.ts',
    
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.(js|ts)x?/,
                exclude: [
                    path.resolve("node_modules")
                ]
            }
        ]
    }
}