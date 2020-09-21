const { runner } = require('hygen');
const Logger = require('hygen/lib/logger');
const path = require('path');
const defaultTemplates = path.join(__dirname, '../templates');

function runHygen({ generator, filename, path = '' }) {
  return runner(['create', generator, '--name', filename, '--path', path], {
    templates: defaultTemplates,
    cwd: process.cwd(),
    logger: new Logger(console.log.bind(console)),
    // @ts-ignore
    createPrompter: () => require('enquirer'),
    exec: (action, body) => {
      const opts = body && body.length > 0 ? { input: body } : {};
      const actions = action.split('&&');

      for (const action of actions) {
        require('execa').command(action, opts);
      }
      return;
    },
    debug: !!process.env.DEBUG,
  });
}

module.exports = {
  runHygen,
};
