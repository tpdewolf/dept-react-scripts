#!/usr/bin/env node
const { program } = require('commander')
const { runner } = require('hygen')
const fs = require('fs')
const execa = require('execa')
const Logger = require('hygen/lib/logger')
const path = require('path')

const packageJson = require('../package.json')
const defaultTemplates = path.join(__dirname, '../templates')

program.version(packageJson.version)

program
  .command('route <name>')
  .description('Generate new route')
  .action(name => {
    runHygen({
      generator: name.includes('api') ? 'api' : 'page',
      filename: name,
    })
  })

program
  .command('context <name>')
  .description('Generate context')
  .action(name => {
    runHygen({
      generator: 'context',
      filename: name,
    })
  })

program
  .command('component <name>')
  .description('Generate a component')
  .action(name => {
    const { path, filename } = splitPath(name)
    runHygen({
      generator: 'component',
      filename,
      path,
    })
  })

program
  .command('eslint-eject')
  .description('Eject eslint config from dept-react-scripts')
  .action(() => {
    const contents = fs.readFileSync(path.join(__dirname, '../config/eslint/index.js'))
    const eslintPath = path.join(process.cwd(), '.eslintrc.js')
    fs.writeFileSync(eslintPath, contents)

    execa('yarn', [
      'add',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint-config-prettier',
      'eslint-import-resolver-typescript',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-prettier',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'eslint-plugin-simple-import-sort',
      '-D',
      // @ts-ignore
    ]).stdout.pipe(process.stdout)

    console.log('ESLint ejected')
  })

program.parse(process.argv)

function runHygen({ generator, filename, path = '' }) {
  return runner(['create', generator, '--name', filename, '--path', path], {
    templates: defaultTemplates,
    cwd: process.cwd(),
    logger: new Logger(console.log.bind(console)),
    // @ts-ignore
    createPrompter: () => require('enquirer'),
    exec: (action, body) => {
      const opts = body && body.length > 0 ? { input: body } : {}
      return require('execa').shell(action, opts)
    },
    debug: !!process.env.DEBUG,
  })
}

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
