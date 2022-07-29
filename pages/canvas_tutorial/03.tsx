import { useEffect, useRef, VFC } from 'react'
import { get2DContext } from '../../core/pointer'

const Component: VFC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = get2DContext(canvasRef.current)

      // 大きな矩形を既定の設定で描きます。次にこの状態を保存して、塗りつぶし色を変更します
      ctx.fillRect(0, 0, 150, 150) // 既定の設定で矩形を描画
      ctx.save() // 既定の状態を保存

      ctx.fillStyle = '#09F' // 設定変更
      ctx.fillRect(15, 15, 120, 120) // 新たな設定で矩形を描画

      // やや小さい青色の矩形を描いて、状態を保存します。
      ctx.save() // 現在の状態を保存
      ctx.fillStyle = '#FFF' // 設定変更
      ctx.globalAlpha = 0.5
      ctx.fillRect(30, 30, 90, 90) // 新たな設定で矩形を描画

      // 半透明な白色の矩形を描きます。
      ctx.restore() // 以前の状態を復元
      ctx.fillRect(45, 45, 60, 60) // 復元した設定で矩形を描画

      ctx.restore() // 以前の状態を復元
      ctx.fillRect(60, 60, 30, 30) // 復元した設定で矩形を描画
    }
  })
  return <canvas ref={canvasRef} width="1500" height="1500"></canvas>
}

export default Component
