const fs = require('fs')
const path = require('path')

const { Confirm } = require('enquirer')
const execa = require('execa')


async function eslintEject() {
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
}

module.exports = {
  eslintEject,
}
