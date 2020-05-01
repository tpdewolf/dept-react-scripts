const { runHygen } = require('../utils/runHygen')

const route = name => {
  runHygen({
    generator: name.includes('api') ? 'api' : 'page',
    filename: name,
  })
}

module.exports = {
  route,
}
