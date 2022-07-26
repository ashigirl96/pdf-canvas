export let rAF: number = 0
export let uniquePoints: number[][] = [[10]]
export let rect: DOMRect
export let activePointerId: number | null = null

export interface GlobalPointerOptions {
  activePointerId: number
  resetCanvas: () => void
  canvas: HTMLCanvasElement
  rect: DOMRect
  uniquePoints: number[][]
  // eslint-disable-next-line no-unused-vars
  eventPos: (_event: PointerEvent) => { x: number; y: number }
  container: Element
}

// eslint-disable-next-line no-unused-vars
function isSupportPointerEvents() {
  return !!(document.defaultView && document.defaultView.PointerEvent)
}

// eslint-disable-next-line no-unused-vars
export function isSupportCoalescedEvents() {
  return (
    document.defaultView &&
    document.defaultView.PointerEvent &&
    !!document.defaultView.PointerEvent.prototype.getCoalescedEvents
  )
}

// eslint-disable-next-line no-unused-vars
export function isSupportsPredictedEvents() {
  return (
    document.defaultView &&
    document.defaultView.PointerEvent &&
    !!document.defaultView.PointerEvent.prototype.getPredictedEvents
  )
}

export function querySelector<T>(name: string) {
  // FIXME: refactor type
  return document.querySelector(name) as unknown as T
}

export function get2DContext(canvas: HTMLCanvasElement) {
  return canvas.getContext('2d') as CanvasRenderingContext2D
}

export function eventPosition(event: PointerEvent) {
  const { clientX: x, clientY: y } = event
  return { x, y }
}

export type InitializeCanvasOptions = Pick<
  GlobalPointerOptions,
  'canvas' | 'container'
>
export function initialiseCanvas({
  canvas,
  container,
}: InitializeCanvasOptions) {
  const containerRect = container.getBoundingClientRect()
  canvas.width = containerRect.width * window.devicePixelRatio
  canvas.height = containerRect.height * window.devicePixelRatio
  const ctx = get2DContext(canvas)
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
}

// type ResetCanvasOptions = Pick<GlobalPointerOptions, 'canvas'>
export function resetCanvas() {
  uniquePoints = []
}

type StartDrawingOptions = Pick<GlobalPointerOptions, 'canvas'>
export function startDrawing(
  event: PointerEvent,
  { canvas }: StartDrawingOptions,
) {
  if (activePointerId || !event.isPrimary) {
    return
  }
  resetCanvas()
  activePointerId = event.pointerId
  rect = canvas.getBoundingClientRect()
  canvas.addEventListener('pointermove', savePoints)
  rAF = requestAnimationFrame(() => drawPoints({ canvas }))
}

function savePoints(event: PointerEvent) {
  // only save points if they're from the pointer we started tracking
  if (event.pointerId === activePointerId) {
    event.preventDefault()
    uniquePoints.push([
      eventPosition(event).x - rect.left,
      eventPosition(event).y - rect.top,
    ])
  }
}

type DrawPointsOptions = Pick<GlobalPointerOptions, 'canvas'>
function drawPoints({ canvas }: DrawPointsOptions) {
  const ctx = get2DContext(canvas)

  ctx.lineWidth = 2

  ctx.beginPath()
  uniquePoints.forEach((point) => {
    ctx.lineTo(point[0], point[1])
    ctx.moveTo(point[0], point[1])
  })
  ctx.closePath()
  ctx.stroke()

  if (rAF) {
    rAF = requestAnimationFrame(() => drawPoints({ canvas }))
  }
}

type StopDrawingOptions = Pick<GlobalPointerOptions, 'canvas'>
export function stopDrawing(
  event: PointerEvent,
  { canvas }: StopDrawingOptions,
) {
  activePointerId = null
  canvas.removeEventListener('pointermove', savePoints)
  cancelAnimationFrame(rAF)
  rAF = 0
  drawPoints({ canvas })
}
