#!/usr/bin/env node
const { program } = require('commander')

const { component } = require('../commands/component')
const { context } = require('../commands/context')
const { create } = require('../commands/create')
const { eslintEject } = require('../commands/eslint-eject')
const { route } = require('../commands/route')
const packageJson = require('../package.json')

program.version(packageJson.version)

program.command('create <name>').description('Create a new Dept React project').action(create)
program.command('route <name>').description('Generate new Next.js route').action(route)
program.command('context <name>').description('Generate React context').action(context)
program.command('component <name>').description('Generate a React component').action(component)
program
  .command('eslint-eject')
  .description('Eject eslint config from dept-react-scripts')
  .action(eslintEject)

program.parse(process.argv)
