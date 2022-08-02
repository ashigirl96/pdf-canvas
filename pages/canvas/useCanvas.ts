import { MutableRefObject, useEffect, useRef } from 'react'

type Pointer = {
  id: number
  type: string
  clientX: number
  clientY: number
}

export type Point = { x: number; y: number }
export type Path = {
  width: number
  points: Point[]
  id: string
  timestamp: Date | null
  offsetX: number
  offsetY: number
}

function initializePath(): Path {
  return {
    id: '',
    offsetX: 0,
    offsetY: 0,
    points: [],
    timestamp: null,
    width: 0,
  }
}

interface CanvasState {
  canvasElement: HTMLCanvasElement | null
  parent: HTMLElement | null
  dpr: number
  offsetLeft: number
  offsetTop: number
  width: number
  height: number
  widthPP: number
  heightPP: number
  canvasHeight: number
  canvasWidth: number
  activePointers: Map<number, Pointer>
  drawingPath: Path
  canvasCleanUpHandler: () => void
  tickingDraw: boolean
  isInitialized: boolean
}

function initializeCanvasState(): CanvasState {
  return {
    canvasElement: null,
    canvasHeight: 0,
    canvasWidth: 0,
    dpr: 0,
    height: 0,
    heightPP: 0,
    isInitialized: false,
    offsetLeft: 0,
    offsetTop: 0,
    parent: null,
    width: 0,
    widthPP: 0,
    activePointers: new Map(),
    drawingPath: initializePath(),
    canvasCleanUpHandler: () => {},
    tickingDraw: false,
  }
}

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  const canvasState = useRef<CanvasState>(initializeCanvasState())

  useEffect(() => {
    canvasState.current = {
      ...canvasState.current,
      canvasElement: canvasRef.current,
      parent: canvasRef.current.parentElement,
      dpr: devicePixelRatio,
    }
    handleResize(canvasState)

    const unsubscribers = [
      () =>
        canvasRef.current.addEventListener(
          'pointerdown',
          handlePointerDown(canvasState),
        ),
    ]

    // const ro = new ResizeObserver(() => {
    //   this.handleResizeWithThrottling()
    // })
    // ro.observe(parent!)

    canvasState.current = {
      ...canvasState.current,
      canvasCleanUpHandler: () => {
        unsubscribers.forEach((fn) => {
          fn()
        })
      },
    }
  }, [])

  return {
    canvasRef,
    canvasState,
  }
}

function handleResize(state: MutableRefObject<CanvasState>) {
  const { canvasElement, parent, dpr } = state.current
  if (canvasElement === null || parent === null) return
  const rect = parent.getBoundingClientRect()
  const { left, top, width, height } = rect

  state.current = {
    ...state.current,
    offsetLeft: left,
    offsetTop: top,
    width,
    height,
    widthPP: width * dpr,
    heightPP: height * dpr,
    canvasWidth: width * dpr,
    canvasHeight: height * dpr,
  }
}

function handlePointerDown(state: MutableRefObject<CanvasState>) {
  const { activePointers } = state.current
  return (event: PointerEvent) => {
    if (activePointers.size >= 2) return
    // ignore non-primary button
    if (event.button > 1) return

    state.current.canvasElement?.setPointerCapture(event.pointerId)
    state.current.activePointers.set(event.pointerId, toPointer(event))

    const p = getPoint(state.current, event)
    if (p !== null) {
      state.current = {
        ...state.current,
        drawingPath: {
          width: 0,
          points: [p],
          id: '0',
          timestamp: null,
          offsetX: 0,
          offsetY: 0,
        },
      }
      // draw
    }
  }
}

function handlePointerMove(state: MutableRefObject<CanvasState>) {
  return (event: PointerEvent) => {
    state.current.activePointers.set(event.pointerId, toPointer(event))
    const p = getPoint(state.current, event)
    if (p !== null) {
      pushPoint(state.current.drawingPath.points, p)
    }
  }
}

function toPointer(event: PointerEvent): Pointer {
  const { pointerId: id, pointerType: type, clientX, clientY } = event
  return {
    id,
    type,
    clientX,
    clientY,
  }
}

function getPoint(
  { activePointers, offsetLeft, offsetTop }: CanvasState,
  event: PointerEvent | null,
): Point | null {
  for (const pointer of activePointers.values()) {
    const rawX = pointer.clientX - offsetLeft
    const rawY = pointer.clientY - offsetTop
    const scale = 1.0
    const x = rawX / scale
    const y = rawY / scale
    return { x, y }
  }
  return null
}

function pushPoint(points: Point[] | null, point: Point) {
  if (points === null) return

  if (points.length > 0) {
    const { x, y } = point
    const { x: lastX, y: lastY } = points[points.length - 1]
    if (lastX === x && lastY === y) {
      return
    }
    points.push(point)
  }
}

function tickDraw(canvasState: MutableRefObject<CanvasState>) {
  if (canvasState.current.tickingDraw) return

  canvasState.current.tickingDraw = true
  requestAnimationFrame(() => {
    draw()
    canvasState.current.tickingDraw = false
  })
}
