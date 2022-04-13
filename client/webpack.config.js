const path = require('path');

module.exports = {
  entry: 'node_modules/aws-sdk/lib', // 번들 작업할 파일
  output: {   // 번들화 된 파일 경로
    filename: 'compiled.js' // 파일 명
  },
  watch: true, // 자동 번들화 작업 여부
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js', '.jsx', '.json'],
    symlinks: false,
    cacheWithContext: false,
    util: false
  }
}