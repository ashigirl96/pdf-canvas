import { useCanvas } from './useCanvas'
import { MutableRefObject, useRef } from 'react'

function toTrue(x: MutableRefObject<{ hoge: { fuga: boolean } }>) {
  const hoge = x.current.hoge
  hoge.fuga = true
}

function Canvas() {
  const { canvasRef, canvasState } = useCanvas()

  const x = useRef({ hoge: { fuga: false } })
  console.log(`before x: ${x.current.hoge.fuga}`)
  toTrue(x)
  console.log(`after x: ${x.current.hoge.fuga}`)
  console.log(canvasState)

  return <canvas ref={canvasRef}></canvas>
}

export default Canvas
