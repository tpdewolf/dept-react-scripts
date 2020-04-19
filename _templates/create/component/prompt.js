module.exports = [
  {
    type: 'select',
    name: 'kind',
    message: 'What kind of component?',
    choices: ['atom', 'molecule', 'organism', 'template'],
  },
  {
    type: 'confirm',
    name: 'withStorybook',
    message: 'Add a storybook story?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'withTest',
    message: 'Add a test?',
    default: true,
  },
]
