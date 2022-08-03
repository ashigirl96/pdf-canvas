import { useEffect, useRef, VFC } from 'react'
import { get2DContext } from '../../core/pointer'
import { CanvasDebugger } from './pointer'

const Component: VFC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = get2DContext(canvasRef.current)
      // ctx.fillStyle = 'rgb(200, 0, 0)'
      // ctx.fillRect(10, 10, 50, 50)
      //
      // ctx.fillStyle = 'rgb(0, 0, 200, 0.5)'
      // ctx.fillRect(30, 30, 50, 50)
      //
      // ctx.strokeRect(0, 0, 50, 50)
      //
      // ctx.clearRect(30, 30, 10, 10)
      // 二次曲線の例
      ctx.beginPath()
      ctx.moveTo(75, 25)
      ctx.quadraticCurveTo(25, 25, 25, 62.5)
      ctx.quadraticCurveTo(25, 100, 50, 100)
      ctx.quadraticCurveTo(50, 120, 30, 125)
      ctx.quadraticCurveTo(60, 120, 65, 100)
      ctx.quadraticCurveTo(125, 100, 125, 62.5)
      ctx.quadraticCurveTo(125, 25, 75, 25)
      ctx.stroke()
    }
  })
  return (
    <div>
      <CanvasDebugger canvasRef={canvasRef.current} />
      <canvas ref={canvasRef} width="150" height="150"></canvas>
    </div>
  )
}

export default Component
