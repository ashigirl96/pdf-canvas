import pdfjsWorkerSrc from '../../pdf-worker'
import { useEffect, VFC } from 'react'
import {
  get2DContext,
  initialiseCanvas,
  querySelector,
  resetCanvas,
  startDrawing,
  stopDrawing,
} from '../../core/pointer'
import { pdfjs } from 'react-pdf'

var url =
  // 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf'
  'https://arxiv.org/pdf/1806.05635.pdf'

// The workerSrc property shall be specified.
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc

const PdfPage: VFC = () => {
  let isInitialized = false
  useEffect(() => {
    if (!isInitialized) {
      isInitialized = true
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

      // Asynchronous download of PDF
      var loadingTask = pdfjs.getDocument(url)
      loadingTask.promise.then(
        function (pdf) {
          console.log('PDF loaded')

          // Fetch the first page
          var pageNumber = 1
          pdf.getPage(pageNumber).then(function (page) {
            console.log('Page loaded')

            var scale = 1.5
            var viewport = page.getViewport({ scale })

            // Prepare canvas using PDF page dimensions
            // var canvas = document.getElementById('the-canvas')
            // var context = canvas.getContext('2d')
            // canvas.height = 300
            // canvas.width = 400

            // Render PDF page into canvas context
            var renderContext = {
              canvasContext: get2DContext(canvas),
              viewport: viewport,
            }

            var renderTask = page.render(renderContext)
            renderTask.promise.then(function () {
              console.log('Page rendered')
            })
          })
        },
        function (reason: any) {
          // PDF loading error
          console.error(reason)
        },
      )
    }
  })

  return (
    <>
      <h1>PDF.js 'Hello, world!' example</h1>

      <div className="container">
        <canvas id="the-canvas" height={300} width={400} />
      </div>
    </>
  )
}
export default PdfPage
