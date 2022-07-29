import { useEffect, useRef, useState } from 'react'

function Component() {
  const [scale, setScale] = useState<number>(1)
  const parentDiv = useRef<HTMLDivElement>(null!)
  useEffect(() => {
    if (parentDiv.current) {
      parentDiv.current.addEventListener('wheel', (e) => e.preventDefault(), {
        passive: false,
      })
    }
  })
  return (
    <div
      ref={parentDiv}
      style={{ height: '50vh', backgroundColor: 'pink' }}
      onWheel={(e) => e.preventDefault()}
    >
      <div
        onWheelCapture={(e) => {
          setScale((s) => s + e.deltaY * -0.01)
          setScale((s) => Math.min(Math.max(0.125, s), 4))
        }}
        style={{
          backgroundColor: '#cdf',
          height: 500,
          width: 500,
          margin: 'auto',
          transform: `scale(${scale})`,
        }}
      >
        Wheel Me
      </div>
    </div>
  )
}

export default Component
