import { useRef } from 'react'
import { usePen } from './usePen'

function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  const containerRef = useRef<HTMLDivElement>(null!)

  usePen({ canvasRef, containerRef })

  return (
    <div className="container" ref={containerRef}>
      <canvas id="the-canvas" ref={canvasRef}></canvas>
    </div>
  )
}

export default Component
