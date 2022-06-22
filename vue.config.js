module.exports = {
  publicPath: '',
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:8081',
                changOrigin: true,//允许跨域
                pathRewrite: {
                '^/': ''
                }
            }             
        }
    }
}