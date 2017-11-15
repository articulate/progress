const { expect } = require('chai')
const spy = require('@articulate/spy')

const Progress = require('..')

describe('progress', () => {
  describe('with no config', () => {
    Object.assign(process.stderr, {
      clearLine: spy(),
      cursorTo:  spy(),
      write:     spy()
    })

    afterEach(() => {
      process.stderr.clearLine.reset()
      process.stderr.cursorTo.reset()
      process.stderr.write.reset()
    })

    const progress = Progress()

    beforeEach(done => {
      progress(0.5)
      setTimeout(done, 64)
    })

    it('defaults the output stream to process.stderr', () =>
      expect(process.stderr.write.calls.length).to.equal(1)
    )

    it('defaults the label to "progress"', () =>
      expect(process.stderr.write.calls[0][0]).to.include('progress')
    )

    it('defaults the width to 24', () =>
      expect(process.stderr.write.calls[0][0].match(/\[([= ]+)\]/)[1].length)
        .to.equal(24)
    )

    it('renders a pretty good progress bar', () =>
      expect(process.stderr.write.calls[0][0].match(/\[(=+)/)[1].length)
        .to.equal(12)
    )

    it('renders a percentage', () =>
      expect(process.stderr.write.calls[0][0]).to.include('50%')
    )

    it('does things to make it look like an animating progress bar', () => {
      expect(process.stderr.clearLine.calls[0][0]).to.equal(1)
      expect(process.stderr.cursorTo.calls[0][0]).to.equal(0)
    })

    describe('called multiple times', () => {
      beforeEach(() => {
        progress(0.55)
        progress(0.60)
      })

      it('throttles redraws', () =>
        expect(process.stderr.write.calls.length).to.equal(1)
      )
    })
  })

  describe('with config', () => {
    const label = 'custom'
    const width = 32

    const stream = {
      clearLine: spy(),
      cursorTo:  spy(),
      write:     spy()
    }

    afterEach(() => {
      stream.clearLine.reset()
      stream.cursorTo.reset()
      stream.write.reset()
    })

    const progress = Progress({ label, stream, width })

    beforeEach(done => {
      progress(0.5)
      setTimeout(done, 64)
    })

    it('accepts a custom stream', () =>
      expect(stream.write.calls.length).to.equal(1)
    )

    it('accepts a custom label', () =>
      expect(stream.write.calls[0][0]).to.include(label)
    )

    it('accepts a custom width', () =>
      expect(stream.write.calls[0][0].match(/\[([= ]+)\]/)[1].length)
        .to.equal(width)
    )
  })
})
