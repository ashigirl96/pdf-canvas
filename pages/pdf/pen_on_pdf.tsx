import { usePdf } from './usePdf'
import { usePen } from './usePen'

function Component() {
  const { canvasRef, containerRef } = usePdf()
  usePen({ canvasRef, containerRef })

  return (
    <div className="container" ref={containerRef}>
      <canvas id="the-canvas" ref={canvasRef}></canvas>
    </div>
  )
}

export default Component
