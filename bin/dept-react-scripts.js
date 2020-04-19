#!/usr/bin/env node
const packageJson = require('../package.json')
const { program } = require('commander')
const { runner } = require('hygen')
const Logger = require('hygen/lib/logger')
const path = require('path')
const defaultTemplates = path.join(__dirname, '../_templates')

const hygen = require('hygen')

program.version(packageJson.version)

program
  .command('component <name>')
  .description('Generate a component')
  .action(async name => {
    console.log(name, 'executing')

    runner(['generator', 'component', name], {
      templates: defaultTemplates,
      cwd: process.cwd(),
      logger: new Logger(console.log.bind(console)),
      createPrompter: () => require('enquirer'),
      exec: (action, body) => {
        const opts = body && body.length > 0 ? { input: body } : {}
        return require('execa').shell(action, opts)
      },
      debug: !!process.env.DEBUG,
    })
  })

program.parse(process.argv)
