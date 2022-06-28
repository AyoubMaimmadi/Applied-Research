import * as path from 'path'
import * as fs from 'fs'
import * as express from 'express'
import serverMain from './dist/server/main-server'

console.log(serverMain)

const app = express()

function resolve(p) {
  return path.resolve(__dirname, p)
}

app.use(
  require('serve-static')(resolve('dist/client'), {
    index: false,
  })
)

const index = fs
  .readFileSync(path.join(__dirname, 'dist', 'client', 'index.html'))
  .toString()

function getMicroTime(): number {
  var hrTime = process.hrtime()
  return Math.round(hrTime[0] * 1000000 + hrTime[1] / 1000)
}

app.use('/:size/:depth', function (req, res) {
  const now = getMicroTime()
  const size = +req.params.size
  const depth = +req.params.depth

  const html = index.replace(
    'run the app using /render/number1/number2',
    serverMain(size, depth)
  )
  res
    .setHeader('time-taken', getMicroTime() - now)
    .status(200)
    .set({ 'Content-Type': 'text/html' })
    .end(html)
})

app.listen(3001, () => {
  console.log('http://localhost:3001')
})
