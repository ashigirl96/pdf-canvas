import { useEffect, useRef, VFC } from 'react'
import { get2DContext } from '../../core/pointer'

const Component: VFC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = get2DContext(canvasRef.current)
      // 二次曲線の例
      const lineCaps: CanvasLineCap[] = ['butt', 'round', 'square']

      // ガイドを描画
      ctx.strokeStyle = '#09f'
      ctx.beginPath()
      ctx.lineWidth = 5
      ctx.lineCap = 'round'
      ctx.moveTo(10, 10)
      ctx.lineTo(140, 10)
      ctx.moveTo(10, 140)
      ctx.lineTo(140, 140)
      ctx.stroke()

      // 線を描画
      ctx.strokeStyle = 'black'
      lineCaps.forEach((lineCap, i) => {
        ctx.lineWidth = 15
        ctx.lineCap = lineCap
        ctx.beginPath()
        ctx.moveTo(25 + i * 50, 10)
        ctx.lineTo(25 + i * 50, 140)
        ctx.stroke()
      })
    }
  })
  return <canvas ref={canvasRef} width="1500" height="1500"></canvas>
}

export default Component
