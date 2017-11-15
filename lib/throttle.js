const delay = 1000 / 30

const throttle = f => {
  let args
  let lock = false

  const exec = () => {
    f.apply(null, args)
    lock = false
  }

  const throttled = (...latest) => {
    args = latest
    if (!lock) {
      setTimeout(exec, delay)
      lock = true
    }
  }

  return throttled
}

module.exports = throttle
