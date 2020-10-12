const { execSync } = require('child_process')
const fs = require('fs')

const Case = require('case')
const chalk = require('chalk')

function create(name) {
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
}

module.exports = {
  create,
}
