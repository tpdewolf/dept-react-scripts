const { runHygen } = require('../utils/runHygen')

const context = name => {
  runHygen({
    generator: 'context',
    filename: name,
  })
}

module.exports = {
  context,
}
