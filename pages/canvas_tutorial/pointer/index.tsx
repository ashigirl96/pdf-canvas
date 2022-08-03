import { useCanvas } from './useCanvas'
import { FC, memo } from 'react'

// export const CanvasDebugger: FC = ({ canvasRef }) => {
//   if (!canvasRef) {
//     return <div>Hello</div>
//   }
//   // if (canvasRef.current) {
//   //   return <div>Hello</div>
//   const {
//     width,
//     height,
//     offsetHeight,
//     offsetWidth,
//     style,
//     offsetTop,
//     offsetLeft,
//     scrollTop,
//     scrollLeft,
//     scrollWidth,
//     scrollHeight,
//   } = canvasRef
//   //   //
//   return (
//     <div>
//       <span>width: {width},</span>
//       <span>height: {height},</span>
//       <span>offsetHeight: {offsetHeight},</span>
//       <span>offsetWidth: {offsetWidth},</span>
//       <span>style: {style},</span>
//       <span>offsetTop: {offsetTop},</span>
//       <span>offsetLeft: {offsetLeft},</span>
//       <span>scrollTop: {scrollTop},</span>
//       <span>scrollLeft: {scrollLeft},</span>
//       <span>scrollWidth: {scrollWidth},</span>
//       <span>scrollHeight,: {scrollHeight},</span>
//     </div>
//   )
// }

function MultiPointer() {
  const { canvasRef, canvasState } = useCanvas()

  return (
    <div style={{ margin: '100px' }}>
      <div
        onClick={() => {
          console.warn(JSON.stringify(canvasRef.current?.width))
          console.warn(JSON.stringify(canvasState.current?.canvasElement.width))
        }}
      >
        Width
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
export default MultiPointer
