const { runHygen } = require('../utils/runHygen')

function splitPath(filename) {
  let path = ''

  if (filename.includes('/')) {
    const parts = filename.split('/')
    filename = parts.pop()
    path = parts.join('/') + '/'
  }

  return {
    path,
    filename,
  }
}

const component = name => {
  const { path, filename } = splitPath(name)
  runHygen({
    generator: 'component',
    filename,
    path,
  })
}

module.exports = {
  component,
}
