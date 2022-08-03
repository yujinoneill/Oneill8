const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://oneill8.herokuapp.com/",
      changeOrigin: true,
    })
  );
};
