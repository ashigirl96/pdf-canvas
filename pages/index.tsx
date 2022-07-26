import type { NextPage } from 'next'
import { useEffect } from 'react'
import {
  initialiseCanvas,
  querySelector,
  resetCanvas,
  startDrawing,
  stopDrawing,
} from '../core/pointer'
import Link from 'next/link'

const Home: NextPage = () => {
  useEffect(() => {
    const container = querySelector<HTMLDivElement>('.container')
    const canvas = querySelector<HTMLCanvasElement>('canvas')

    initialiseCanvas({ canvas, container })
    resetCanvas()
    canvas.addEventListener('pointerdown', (event: PointerEvent) =>
      startDrawing(event, { canvas }),
    )
    canvas.addEventListener('pointerup', (event: PointerEvent) =>
      stopDrawing(event, { canvas }),
    )
  })

  return (
    <>
      <header>
        <h1>
          <code>getCoscedEvents()</code> and <code>getPredictedEvents()</code>
        </h1>
        <p>
          Adapted from{' '}
          <a
            href="https://pspdfkit.com/blog/2019/using-getcoalescedevents/"
            target="_blank"
          >
            Smoother Interactions on the Web: getCoalescedEvents()
          </a>
          . Only tracks a single <code>isPrimary</code> pointer.
        </p>
        <div className="support"></div>
      </header>
      <Link href="/pdf">
        <a>PDF</a>
      </Link>
      <div className="container">
        <canvas width="400" height="300"></canvas>
      </div>
    </>
  )
}

export default Home
