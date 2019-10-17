module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name(file) {
            return '/img/[name].[hash:8].[ext]';
          },
        },
      },
    ],
  },
};
