import { RefObject, useEffect, useState } from 'react'

interface Params<El extends HTMLElement> {
  elementRef: RefObject<El>
}

export const usePaneResize = <El extends HTMLElement>({
  elementRef,
}: Params<El>): { activateResizeMode: () => void } => {
  const [resizeMode, setResizeMode] = useState(false)

  const activateResizeMode = () => setResizeMode(true)

  useEffect(() => {
    const handleResize = (e) => {
      if (elementRef?.current) {
        elementRef.current.style.width = `${e.clientX}px`
      }
    }

    const handleMouseUp = () => {
      console.log('mouse up')
      setResizeMode(false)
    }

    if (resizeMode) {
      document.addEventListener('mousemove', handleResize)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleResize)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [resizeMode, elementRef])

  return { activateResizeMode }
}
