import { pdfjs } from 'react-pdf'
import { useEffect, useMemo, useRef } from 'react'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const url = 'https://arxiv.org/pdf/1806.05635.pdf'

export function usePdf() {
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  const containerRef = useRef<HTMLDivElement>(null!)

  const isLoaded = useRef(false)
  const loadingTask = useMemo(() => pdfjs.getDocument(url), [])

  useEffect(() => {
    console.log('')
    ;(async () => {
      const pdf = await loadingTask.promise
      const page = await pdf.getPage(1)
      const scale = 1.3
      const viewPort = page.getViewport({ scale, offsetX: 100 })

      if (canvasRef.current && containerRef.current) {
        const context = canvasRef.current.getContext('2d')
        const renderContext = {
          canvasContext: context!,
          viewport: viewPort,
        }
        if (!isLoaded.current) {
          isLoaded.current = true // TODO: この行がawaitよりあとだと駄目
          await page.render(renderContext)
        }
      }
    })()
  }, [loadingTask])

  return {
    canvasRef,
    containerRef,
  }
}
