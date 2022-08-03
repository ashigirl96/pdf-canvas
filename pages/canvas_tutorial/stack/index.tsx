import { useRef } from 'react'

function CreateElement() {
  if (document === undefined) {
    const canvas = useRef<HTMLCanvasElement>(document.createElement('canvas'))
  }
}

export default CreateElement
