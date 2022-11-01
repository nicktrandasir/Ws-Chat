module.exports = {
  webpack: {
    resolve: {
      modules: ["src", "node_modules"],
    },
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
      });

      return webpackConfig;
    }
  },
  style: {
    postcssOptions: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
