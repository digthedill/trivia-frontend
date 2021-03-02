const path = require("path")

module.exports = {
  webpack: {
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
  },
}
