const { compose, converge } = require('tinyfunk')

const throttle = require('./throttle')

const dots = '⠋⠋⠇⠇⡆⡆⣄⣄⣀⣀⣠⣠⢰⢰⠸⠸⠙⠙⠉⠉'

const Progress = (opts={}) => {
  const {
    label  = 'progress',
    stream = process.stderr,
    width  = 24
  } = opts

  let dot = 0

  const bar = ratio => {
    const normalized = Math.ceil(ratio * width - 0.5)
    const left  = Array(normalized).fill('=')
    const right = Array(width - normalized).fill(' ')
    return left.concat(right).join('')
  }

  const percent = ratio =>
    Math.floor(ratio * 100)

  const render = throttle(str => {
    stream.cursorTo(0)
    stream.write(str)
    stream.clearLine(1)
    dot = ++dot % dots.length
  })

  const view = (bar, percent) =>
    `${label}: ${dots[dot]} [${bar}] ${percent}% `

  return compose(render, converge(view, [ bar, percent ]))
}

module.exports = Progress
