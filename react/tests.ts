import * as path from 'path'
import * as fs from 'fs'
import serverMain from './dist/server/main-server'

function resolve(p) {
  return path.resolve(__dirname, p)
}

const index = fs
  .readFileSync(path.join(__dirname, 'dist', 'client', 'index.html'))
  .toString()

function render(size: number, depth: number): string {
  return index.replace(
    'run the app using /render/number1/number2',
    serverMain(size, depth)
  )
}

function renderLoop(count: number, size: number, depth: number): number {
  const now = Date.now()
  for (let i = 0; i < count; ++i) {
    render(size, depth)
  }
  return Date.now() - now
}

const depth = +process.argv[2]
if (!depth) {
  console.error('provide a depth please ./prog <depth>')
  process.exit(1)
}
console.log('100', renderLoop(100, 20, depth))
console.log('1000', renderLoop(1000, 20, depth))
console.log('10000', renderLoop(10000, 20, depth))
console.log('100000', renderLoop(100000, 20, depth))
console.log('1000000', renderLoop(1000000, 20, depth))
