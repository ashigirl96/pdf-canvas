import { FC, useEffect, useRef, useState } from 'react'

const Capture: FC = () => {
  const ref = useRef<HTMLDivElement>(null!)
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.addEventListener('touchstart', (e) => e.preventDefault(), {
      passive: false,
    })
  }, [])
  return (
    <div
      ref={ref}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: 'blue',
        color: 'white',
        fontSize: 20,
      }}
      onPointerDown={(e) => ref.current.setPointerCapture(e.pointerId)}
      // PointerDownしたときにcaptureしたから、moveしたときにちゃんと反映される
      onPointerMove={(e) => {
        e.preventDefault()
        setCount(e.clientX)
      }}
    >
      {count}
    </div>
  )
}

export default Capture
