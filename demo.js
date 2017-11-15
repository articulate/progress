const progress = require('.')()

let n = 0
const total = 1000

const update = () => {
  progress(++n / total)
  if (n >= total) {
    clearInterval(id)
    process.exit(0)
  }
}

const id = setInterval(update, 10)
