const autoprefixer = require('autoprefixer')(
  {
    browsers: [
      'last 2 versions'
    ]
  }
)

module.exports = { plugins: [autoprefixer] }
