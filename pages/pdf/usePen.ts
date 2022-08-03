import { MutableRefObject, useEffect } from 'react'
import {
  initialiseCanvas,
  resetCanvas,
  startDrawing,
  stopDrawing,
} from '../../core/pointer'

interface UsePen {
  canvasRef: MutableRefObject<HTMLCanvasElement>
  containerRef: MutableRefObject<HTMLDivElement>
}
export function usePen({ canvasRef, containerRef }: UsePen) {
  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const canvas = canvasRef.current
      const container = containerRef.current
      initialiseCanvas({ canvas, container })
      resetCanvas()
      canvas.addEventListener('pointerdown', (event: PointerEvent) =>
        startDrawing(event, { canvas, container }),
      )
      canvas.addEventListener('pointerup', (event: PointerEvent) =>
        stopDrawing(event, { canvas }),
      )
    }
  }, [canvasRef, containerRef])
}
