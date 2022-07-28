import { useEffect, useRef, VFC } from 'react'
import { get2DContext } from '../../core/pointer'

const Component: VFC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = get2DContext(canvasRef.current)
      ctx.fillStyle = 'rgb(200, 0, 0)'
      ctx.fillRect(10, 10, 50, 50)

      ctx.fillStyle = 'rgb(0, 0, 200, 0.5)'
      ctx.fillRect(30, 30, 50, 50)
    }
  })
  return <canvas ref={canvasRef} width="150" height="150"></canvas>
}

export default Component
