import { useEffect, useRef } from 'react'

class CanvasState {
  canvasElement: HTMLCanvasElement

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvasElement = canvasElement
  }
}

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasState = useRef<CanvasState>(null!)

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     canvasState.current = new CanvasState(canvasRef.current)
  //
  //     console.warn(`canvasState ${canvasState.current.canvasElement.width}`)
  //   }
  // })

  useEffect(() => {
    if (canvasRef.current) {
      canvasState.current = new CanvasState(canvasRef.current)
    }
  }, [])

  return {
    canvasRef,
    canvasState,
  }
}
