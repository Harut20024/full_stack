module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.PORT}`,
        changeOrigin: true,
      },
    },
  },
  lintOnSave: false,
};
