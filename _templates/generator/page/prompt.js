module.exports = [
  {
    type: 'select',
    name: 'componentType',
    message: 'Functional or Class',
    choices: ['Functional', 'Class'],
    default: 'Functional',
  },
  {
    type: 'select',
    name: 'dataFetching',
    message: 'Static or SSR',
    choices: ['Static', 'SSR', 'Neither'],
    default: 'Static',
  },
]
