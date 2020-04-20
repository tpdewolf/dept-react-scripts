#!/usr/bin/env node
const { program } = require('commander')
const { runner } = require('hygen')
const fs = require('fs')
const execa = require('execa')
const { execSync } = require('child_process')
const Logger = require('hygen/lib/logger')
const path = require('path')
const Case = require('case')
const chalk = require('chalk')
const { Confirm } = require('enquirer')

const packageJson = require('../package.json')
const defaultTemplates = path.join(__dirname, '../templates')

program.version(packageJson.version)

program
  .command('create <name>')
  .description('Create a new Dept React project')
  .action(name => {
    try {
      const projectName = Case.snake(name)
      execSync(`npx degit git@bitbucket.org:tamtam-nl/dtnl-dept-react-setup.git ${projectName}`)
      const projectFilePath = `${projectName}/package.json`
      const projectFile = fs.readFileSync(projectFilePath, 'utf-8')
      const projectObject = JSON.parse(projectFile)
      projectObject.name = projectName
      projectObject.version = '1.0.0'
      projectObject.description = 'Dept React project'
      projectObject.contributors = []
      delete projectObject.repository
      fs.writeFileSync(projectFilePath, JSON.stringify(projectObject), 'utf-8')
      execSync(`npx prettier --write ${projectFilePath}`)
      execSync(
        `git init && git add . && git commit -am "Initialized project with dept-react-scripts" && yarn`,
        {
          cwd: projectName,
        },
      )

      console.log(
        `Project ${chalk.green(projectName)} has succesfully been created in ${chalk.yellow(
          `${process.cwd()}/${projectName}`,
        )}`,
      )

      console.log(`Run ${chalk.yellow(`yarn dev`)} to start the development server.`)
    } catch (err) {
      console.error(chalk.red('Something went wrong while initializing project.'))
    }
  })

program
  .command('route <name>')
  .description('Generate new Next.js route')
  .action(name => {
    runHygen({
      generator: name.includes('api') ? 'api' : 'page',
      filename: name,
    })
  })

program
  .command('context <name>')
  .description('Generate React context')
  .action(name => {
    runHygen({
      generator: 'context',
      filename: name,
    })
  })

program
  .command('component <name>')
  .description('Generate a React component')
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
  .action(async () => {
    const confirm = new Confirm({
      name: 'confirm',
      message: `Are you sure you want to eject? This can't be undone`,
    })

    if (!(await confirm.run())) {
      return
    }

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
