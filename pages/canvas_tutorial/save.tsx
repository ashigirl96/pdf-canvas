import { useEffect, useRef, VFC } from 'react'
import { get2DContext } from '../../core/pointer'

const Component: VFC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = get2DContext(canvasRef.current)

      // fillStyleがredとして保存される(コンテキストの状態を保存)
      ctx.fillStyle = 'red'
      ctx.save()

      ctx.fillStyle = 'green'
      ctx.fillRect(10, 10, 100, 100)

      // fillStyleがredなのが戻る
      ctx.restore()

      ctx.fillRect(150, 40, 100, 100)
    }
  })
  return (
    <canvas
      style={{ backgroundColor: 'gray' }}
      ref={canvasRef}
      width="1500"
      height="1500"
    ></canvas>
  )
}

export default Component
