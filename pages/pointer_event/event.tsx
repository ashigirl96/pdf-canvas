import { useEffect, useRef, useState, VFC } from 'react'
import { get2DContext } from '../../core/pointer'

const Component: VFC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pointerId, setPointerId] = useState(0)
  const [pointerType, setPointerType] = useState('')
  const [cord, setCord] = useState({ width: 0, height: 0 })
  const [cordMove, setCordMove] = useState({ width: 0, height: 0 })
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = get2DContext(canvasRef.current)
    }
  })
  return (
    <div>
      <div>PointerId {pointerId}</div>
      <div>PointerType {pointerType}</div>
      <div>
        onPointerDown width {cord.width} height {cord.height}
      </div>
      <div>
        onPointerMove width {cordMove.width} height {cordMove.height}
      </div>
      <div>when pointer up is {now.toLocaleTimeString()}</div>
      <canvas
        ref={canvasRef}
        width="1500"
        height="1500"
        onPointerDown={(e) => {
          setPointerId(e.pointerId)
          setPointerType(e.pointerType)
          setCord({ width: e.clientX, height: e.clientY })
        }}
        onPointerUp={() => setNow(new Date())}
        onPointerMove={(e) => {
          setCordMove({ width: e.clientX, height: e.clientY })
        }}
      ></canvas>
    </div>
  )
}

export default Component
