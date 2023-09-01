const chalk = require('chalk')
const runMocha = require('./helpers/runMocha')

const start = async () => {
  try {
    console.log(chalk`\n{bold.hex('#1a82ff') Running Tests }\n`)
    await runMocha()
    process.exit()

  } catch (error) {
    console.log(chalk`\n{bold ⚠️  Tests failed. :( }\n`)
    console.error(error)
    process.exit(1)
  }
}

start()
